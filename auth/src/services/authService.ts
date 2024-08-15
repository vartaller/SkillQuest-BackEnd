import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import RedisService from './redisService';
import {randomBytes} from "crypto";
import RabbitMQ from "../utils/rabbitMQ";
import {MessageEventTypes} from "../types/messageEventTypes";
import {UserLoggedDto, UserRegisteredDto} from "../dto/user.dto";
import logger from "../utils/logger";

class AuthService {
    async register(username: string, email: string, password: string) {

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = randomBytes(4).toString('hex');

        const userKey = `user:${email}`;

        await RedisService.hset(userKey, 'id', id, 'username', username, 'email', email, 'password', hashedPassword);

        await RedisService.sadd(`index:id:${id}`, userKey);
        await RedisService.sadd(`index:email:${email}`, userKey);

        const token = jwt.sign({username: username, email: email}, process.env.JWT_SECRET as string, {
            expiresIn: '48h',
        });

        const userRegistered: UserRegisteredDto = {
            id: id,
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

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
        } else {
            throw new Error(`User not found`);
        }

        const token = jwt.sign({username: user.username, email: email}, process.env.JWT_SECRET as string, {
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

    async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            return decoded;
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
}

export default new AuthService();
