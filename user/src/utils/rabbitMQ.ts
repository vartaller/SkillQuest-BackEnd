import amqp from 'amqplib';

class RabbitMQ {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    async connect() {
        try {
            this.connection = await amqp.connect('amqp://localhost'); // Используйте ваш URL подключения
            this.channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
        }
    }

    async sendToQueue(queue: string, message: any) {
        await this.channel.assertQueue(queue, { durable: false });
        this.channel.sendToQueue(queue, Buffer.from(message));
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

    async close() {
        await this.channel.close();
        await this.connection.close();
    }
}

export default new RabbitMQ();
