import * as Redis from 'ioredis';
import {redis} from "../configs/redis.config";
import {checkRedisConnection} from "../configs/redis.config";

class RedisService {
    private client: Redis.Redis;

    constructor() {
        this.client = redis;

        checkRedisConnection();
    }

    async set(key: string, value: string, expireSeconds?: number): Promise<void> {
        if (expireSeconds) {
            await this.client.set(key, value, 'EX', expireSeconds);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<number> {
        return await this.client.del(key);
    }
}

export default new RedisService();
