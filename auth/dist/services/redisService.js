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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_config_1 = require("../configs/redis.config");
const redis_config_2 = require("../configs/redis.config");
class RedisService {
    constructor() {
        this.client = redis_config_1.redis;
        (0, redis_config_2.checkRedisConnection)();
    }
    set(key, value, expireSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expireSeconds) {
                yield this.client.set(key, value, 'EX', expireSeconds);
            }
            else {
                yield this.client.set(key, value);
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(key);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.del(key);
        });
    }
    hset(key, ...fieldsAndValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.hset(key, ...fieldsAndValues);
        });
    }
    hget(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.hget(key, field);
        });
    }
    sadd(key, ...members) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.sadd(key, ...members);
        });
    }
    hgetall(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.hgetall(key);
        });
    }
}
exports.default = new RedisService();
