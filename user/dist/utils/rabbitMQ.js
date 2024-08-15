"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQ {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect('amqp://localhost'); // Используйте ваш URL подключения
                this.channel = yield this.connection.createChannel();
                console.log('Connected to RabbitMQ');
            }
            catch (error) {
                console.error('Error connecting to RabbitMQ:', error);
            }
        });
    }
    sendToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue, { durable: false });
            this.channel.sendToQueue(queue, Buffer.from(message));
        });
    }
    receiveFromQueue(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue, { durable: false });
            yield this.channel.consume(queue, message => {
                if (message !== null) {
                    console.log('Received:', message.content.toString());
                    callback(message.content.toString());
                    this.channel.ack(message);
                }
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.close();
            yield this.connection.close();
        });
    }
}
exports.default = new RabbitMQ();
