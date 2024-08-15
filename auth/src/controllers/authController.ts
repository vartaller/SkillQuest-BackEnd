import { Request, Response } from 'express';
import AuthService from '../services/authService';
import logger from "../utils/logger";

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const token = await AuthService.register(username, email, password);
        res.status(201).json({ token });
    } catch (err) {
        const message = (err as Error).message;
        res.status(500).json({ message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    logger.debug(`email = ${email}, password = ${password}`)

    try {
        const token = await AuthService.login(email, password);
        res.status(200).json({ token });
    } catch (err) {
        const message = (err as Error).message;
        res.status(401).json({ message });
    }
};
