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
        await RabbitMQ.connect().then(() => logger.info('Connected to RabbitMQ successfully'));

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

        const server = app.listen(process.env.PORT, () => {
            logger.info(`App started on PORT: ${process.env.PORT}`);
        });

        server.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
                logger.warning(`PORT: ${process.env.PORT} already in use`);
            } else {
                logger.error(`Error starting server: ${err.message}`);
            }
        });
    } catch (error) {
        logger.error(`Error during service initialization: ${error}`);
    }
};

start();
