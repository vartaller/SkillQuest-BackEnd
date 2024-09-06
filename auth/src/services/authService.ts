import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import RedisService from './redisService';
import RabbitMQ from "../utils/rabbitMQ";
import {MessageEventTypes} from "../types/messageEventTypes";
import {UserLoggedDto, UserRegisteredDto} from "../dto/user.dto";
import logger from "../utils/logger";

class AuthService {
    async register(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const token = jwt.sign({username: username, email: email}, process.env.JWT_SECRET as string, {
            expiresIn: '48h',
        });

        const userKey = `user:${email}`;

        await RedisService.hset(userKey, 'id', userId, 'username', username, 'email', email, 'password', hashedPassword);

        await RedisService.sadd(`index:id:${userId}`, userKey);
        await RedisService.sadd(`index:email:${email}`, userKey);

        const userRegistered: UserRegisteredDto = {
            id: userId,
            username: username,
            email: email,
            hashedPassword: hashedPassword,
            token: token,
        };

        await RabbitMQ.publish(MessageEventTypes.UserRegistered, userRegistered);
        logger.info(`User registered successfully`)

        return token;
    }

    async login(email: string, password: string) {
        const userKey = `user:${email}`;

        const user = await RedisService.hgetall(userKey);

        if (user.password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
        } else {
            throw new Error(`User not found`);
        }

        const token = jwt.sign({email: email}, process.env.JWT_SECRET as string, {
            expiresIn: '48h',
        });

        const userLogged: UserLoggedDto = {
            id: user.id,
            token: token,
        };

        await RabbitMQ.publish(MessageEventTypes.UserLogged, userLogged);
        logger.info(`User logged successfully`)

        return token;
    }
}

export default new AuthService();
