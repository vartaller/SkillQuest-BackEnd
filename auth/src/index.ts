import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import RabbitMQ from './utils/rabbitMQ';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const start = async () => {
    await RabbitMQ.connect().then((res) => console.log(`Connected to RabbitMQ: ${res}`));

    app.listen(process.env.PORT, () => {
        console.log(`Auth service listening on port ${process.env.PORT}`);
    });
};

start();
