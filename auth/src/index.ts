import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import RabbitMQ from './utils/rabbitMQ';
import dotenv from 'dotenv';
import logger from "./utils/logger";
import {MessageEventTypes} from "./types/messageEventTypes";
import authService from "./services/authService";
import {HTTP_STATUS_CODES} from "./constants/httpStatusCodes";
import * as net from "node:net";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

const start = async () => {
await RabbitMQ.connect().then((res) => logger.info(`Connected to RabbitMQ`));

    await RabbitMQ.createQueue(MessageEventTypes.UserDeleted)

    await RabbitMQ.receiveFromQueue(
        MessageEventTypes.UserDeleted, async (msg) => {
            const userIdUnparsed = msg?.content.toString()
            logger.debug(`got UserDeleted message: ${JSON.stringify(msg)}`)
            if (userIdUnparsed) {
                const statusCode = await authService.delete(userIdUnparsed)
                if (statusCode !== HTTP_STATUS_CODES.NO_CONTENT) {
                    logger.error(`User deletion fail: ${JSON.stringify(msg)}`);
                }
            } else {
                logger.error(`User deletion, wrong user id: ${JSON.stringify(msg)}`);
            }
        }
    ).catch(error => logger.error(`Error in receiving UserLogged message: ${error}`))

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
};

start();
