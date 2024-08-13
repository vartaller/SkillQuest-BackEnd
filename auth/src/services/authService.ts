import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import RedisService from './redisService';

class AuthService {
    async register(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, password: hashedPassword };
        await RedisService.set(`user:${username}`, JSON.stringify(user));
        return user;
    }

    async login(username: string, password: string) {
        const userData = await RedisService.get(`user:${username}`);
        if (!userData) {
            throw new Error('User not found');
        }

        const user = JSON.parse(userData);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
            expiresIn: '24h',
        });

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
