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
exports.redis = void 0;
exports.checkRedisConnection = checkRedisConnection;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = __importDefault(require("../utils/logger"));
const redisConfig = {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // IPv4
    password: "g1dfRE4dOt", // your password
    db: 0 // default DB
};
exports.redis = new ioredis_1.default(redisConfig);
exports.redis.on('error', (err) => {
    logger_1.default.error(`Redis connection error: ${err}`);
});
exports.redis.on('connect', () => {
    logger_1.default.info(`Connected to Redis`);
});
function checkRedisConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield exports.redis.ping();
            logger_1.default.info(`Redis Ping Response: ${response}`);
        }
        catch (err) {
            logger_1.default.error(`Error pinging Redis: ${err}`);
        }
    });
}
