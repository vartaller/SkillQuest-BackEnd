import express from 'express';
import bodyParser from 'body-parser';
import userRouters from './routes/userRoutes';
import RabbitMQ from './utils/rabbitMQ';
import dotenv from 'dotenv';
import "reflect-metadata"
import {MessageEventTypes} from "./types/messageEventTypes";
import logger from "./utils/logger";
import {userController} from "./dependencies/dependencies";
import {UserRegisteredDto} from "./dto/user.dto";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/user', userRouters);

const start = async () => {
    try {
        await RabbitMQ.connect();
        logger.info('Connected to RabbitMQ successfully');

        RabbitMQ.receiveFromQueue(
            MessageEventTypes.UserLogged, (msg) =>
                logger.debug(`got UserLogged message: ${JSON.stringify(msg)}`),
        ).catch(error => logger.error(`Error in receiving UserLogged message: ${error}`))

        RabbitMQ.receiveFromQueue(
            MessageEventTypes.UserRegistered, (msg) => {
                logger.debug(`got UserRegistered message: ${msg}`)
                const userUnparsed = msg?.content.toString()
                try {
                    if (userUnparsed != null) {
                        const user: UserRegisteredDto = JSON.parse(userUnparsed);
                        userController.createUser(user)
                    }
                } catch (error) {
                    logger.error(`Wrong format of UserRegistered message: ${msg}`)
                }
            }
        ).catch(error => logger.error(`Error in receiving UserRegistered message: ${error}`))

        const port = process.env.PORT;
        app.listen(port, () => {
            logger.info(`service running on port ${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(`Error during service initialization: ${error}`);
    }
};

start();
