import * as amqp from 'amqplib';

class RabbitMQ {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async connect() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL as string);
        this.channel = await this.connection.createChannel();
    }

    async publish(queue: string, message: any) {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async consume(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
        await this.channel.assertQueue(queue, { durable: true });
        await this.channel.consume(queue, callback, {noAck: true});
    }
}

export default new RabbitMQ();
