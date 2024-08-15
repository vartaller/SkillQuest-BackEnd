import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import RabbitMQ from './utils/rabbitMQ';
import dotenv from 'dotenv';
import logger from "./utils/logger";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

const start = async () => {
    await RabbitMQ.connect().then((res) => logger.info(`Connected to RabbitMQ`));

    app.listen(process.env.PORT, () => {
        logger.info(`service running on port ${process.env.PORT}`);
    });
};

start();
