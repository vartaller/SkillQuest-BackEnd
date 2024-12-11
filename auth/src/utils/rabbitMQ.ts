import * as amqp from 'amqplib';
import {UserLoggedDto, UserRegisteredDto} from "../dto/user.dto";

class RabbitMQ {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async connect() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        this.channel = await this.connection.createChannel();
    }

    async createQueue(queue: string) {
        await this.channel.assertQueue(queue, { durable: true });
    }

    async publish(queue: string, message: UserLoggedDto) {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async receiveFromQueue(queue: string, callback: (msg:  amqp.ConsumeMessage | null) => void) {
        await this.channel.consume(queue, message => {
            if (message !== null) {
                console.log('Received:', message.content.toString());
                callback(message);
                this.channel.ack(message);
            }
        });
    }
}

export default new RabbitMQ();
