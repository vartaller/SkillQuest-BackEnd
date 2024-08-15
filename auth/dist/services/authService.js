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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redisService_1 = __importDefault(require("./redisService"));
const crypto_1 = require("crypto");
const rabbitMQ_1 = __importDefault(require("../utils/rabbitMQ"));
const messageEventTypes_1 = require("../types/messageEventTypes");
const logger_1 = __importDefault(require("../utils/logger"));
class AuthService {
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const id = (0, crypto_1.randomBytes)(4).toString('hex');
            const userKey = `user:${email}`;
            yield redisService_1.default.hset(userKey, 'id', id, 'username', username, 'email', email, 'password', hashedPassword);
            yield redisService_1.default.sadd(`index:id:${id}`, userKey);
            yield redisService_1.default.sadd(`index:email:${email}`, userKey);
            const token = jsonwebtoken_1.default.sign({ username: username, email: email }, process.env.JWT_SECRET, {
                expiresIn: '48h',
            });
            const userRegistered = {
                id: id,
                username: username,
                email: email,
                hashedPassword: hashedPassword,
                token: token,
            };
            yield rabbitMQ_1.default.publish(messageEventTypes_1.MessageEventTypes.UserRegistered, userRegistered);
            logger_1.default.info(`User registered successfully`);
            return token;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userKey = `user:${email}`;
            logger_1.default.debug(`email = ${email}, password = ${password}, userKey = ${userKey}`);
            const user = yield redisService_1.default.hgetall(userKey);
            if (user) {
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid credentials');
                }
            }
            else {
                throw new Error(`User not found`);
            }
            const token = jsonwebtoken_1.default.sign({ username: user.username, email: email }, process.env.JWT_SECRET, {
                expiresIn: '48h',
            });
            const userLogged = {
                id: user.id,
                token: token,
            };
            yield rabbitMQ_1.default.publish(messageEventTypes_1.MessageEventTypes.UserLogged, userLogged);
            return token;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return decoded;
            }
            catch (err) {
                throw new Error('Invalid token');
            }
        });
    }
}
exports.default = new AuthService();
