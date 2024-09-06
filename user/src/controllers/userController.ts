import {Request, Response} from 'express';
import UserService from "../services/userService";
import jwt from "jsonwebtoken";
import {HTTP_STATUS_CODES} from '../constants/httpStatusCodes';
import logger from "../utils/logger";
import {UserRegisteredDto} from "../dto/user.dto";

class UserController {
    userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.bindMethods()
    }

    async createUser(user: UserRegisteredDto) {
        // logger.debug(`req.body = ${JSON.stringify(req.body)}`)
        await this.userService.createUser(user);
        // try {
        //
        //     await this.userService.createUser(req.body);
        //     return res.status(HTTP_STATUS_CODES.OK);
        //
        // } catch (error) {
        //
        //     logger.debug(`controller error: ${error}`)
        //     return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        //
        // }
    }

    async getUserById(req: Request, res: Response) {
        const status = await this.verifyUser(req)
        if (status != HTTP_STATUS_CODES.OK) return res.status(status)
        logger.debug(`getUserById`);
        logger.debug(`req.params.id: ${req.params.id}`);

        try {
            const user = await this.userService.getUserById(String(req.params.id));
            return res.json(user);
        } catch (error) {
            logger.error(`Searching an user by id is failed: ${error}`);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send();
        }
    }

    async updateUser(req: Request, res: Response) {
        const status = await this.verifyUser(req)
        if (status != HTTP_STATUS_CODES.OK || !req.params.id) return res.status(status).send()

        try {
            const user = await this.userService.updateUser({id: req.params.id, ...req.body});
            res.status(HTTP_STATUS_CODES.OK)
            return res.json(user).send();
        } catch (error) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async deleteUserById(req: Request, res: Response) {
        const status = await this.verifyUser(req)
        if (status != HTTP_STATUS_CODES.OK) return res.status(status)

        try {
            await this.userService.deleteUserById(String(req.params.id));
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
        } catch (error) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        logger.debug(`getAllUsers`);
        const status = await this.verifyUser(req)
        if (status != HTTP_STATUS_CODES.OK) return res.status(status)

        try {
            const users = await this.userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    private async verifyUser(req: Request): Promise<number> {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            try {
                const result = jwt.verify(token, process.env.JWT_SECRET as string);
                logger.debug(`Verification result: ${result}`);
                return HTTP_STATUS_CODES.OK
            } catch (err) {
                logger.error(`Verification err: ${err}`);
                return HTTP_STATUS_CODES.FORBIDDEN
            }
        } else {
            logger.error(`There is no Bearer in the header`);
            return HTTP_STATUS_CODES.UNAUTHORIZED
        }
    }

    private async bindMethods() {
        const proto = Object.getPrototypeOf(this);
        Object.getOwnPropertyNames(proto).forEach((key) => {
            const val = (this as any)[key];
            if (typeof val === 'function' && key !== 'constructor') {
                (this as any)[key] = val.bind(this);
            }
        });
    }
}

export default UserController;