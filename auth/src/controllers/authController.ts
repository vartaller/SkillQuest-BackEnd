import {Request, Response} from 'express';
import AuthService from '../services/authService';
import logger from "../utils/logger";
import {HTTP_STATUS_CODES} from "../constants/httpStatusCodes";

export const register = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    try {
        const token = await AuthService.register(username, email, password);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(HTTP_STATUS_CODES.CREATED).json({token});
    } catch (err) {
        const message = (err as Error).message;
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({message});
    }
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    logger.debug(`email = ${email}, password = ${password}`)

    try {
        const token = await AuthService.login(email, password);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(HTTP_STATUS_CODES.OK).json({token});
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Login error: ${message}`);
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json('Wrong credentials');
    }
};
