import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import userRouters from './routes/userRoutes';
import RabbitMQ from './utils/rabbitMQ';
import dotenv from 'dotenv';
import "reflect-metadata"

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/users', userRouters);

const start = async () => {
    try {
        await createConnection(); // Инициализация TypeORM
        console.log('Database connected successfully');

        await RabbitMQ.connect(); // Подключение к RabbitMQ
        console.log('Connected to RabbitMQ successfully');

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error during service initialization:', error);
    }
};

start();
