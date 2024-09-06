import Redis from 'ioredis';
import logger from "../utils/logger";

interface RedisConfig {
    port: number;
    host: string;
    family: number;
    password: string;
    db: number;
}

const redisConfig: RedisConfig = {
    port: 6380,                 // Redis port
    host: "127.0.0.1",          // Redis host
    family: 4,                  // IPv4
    password: "g1dfRE4dOt",     // your password
    db: 0                       // default DB
};

export const redis = new Redis(redisConfig);

redis.on('error', (err: Error) => {
    logger.error(`Redis connection error: ${err}`)
});

redis.on('connect', () => {
    logger.info(`Connected to Redis`)
});

export async function checkRedisConnection(): Promise<void> {
    try {
        const response = await redis.ping();
        logger.info(`Redis Ping Response: ${response}`)
    } catch (err) {
        logger.error(`Error pinging Redis: ${err}`)
    }
}
