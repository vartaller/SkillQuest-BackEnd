import { Request, Response } from 'express';
import AuthService from '../services/authService';
import RabbitMQ from '../utils/rabbitMQ';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await AuthService.register(username, password);
        await RabbitMQ.publish('user.registered', user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        const message = (err as Error).message;
        res.status(500).json({ message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const token = await AuthService.login(username, password);
        res.status(200).json({ token });
    } catch (err) {
        const message = (err as Error).message;
        res.status(401).json({ message });
    }
};
