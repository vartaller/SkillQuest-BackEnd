import Redis from 'ioredis';

// Define interface for Redis configuration options
interface RedisConfig {
    port: number;
    host: string;
    family: number;
    password: string;
    db: number;
}

// Create a configuration object for Redis
const redisConfig: RedisConfig = {
    port: 6379,                 // Redis port
    host: "127.0.0.1",          // Redis host
    family: 4,                  // IPv4
    password: "g1dfRE4dOt",     // your password
    db: 0                       // default DB
};

// Initialize Redis client with configuration
export const redis = new Redis(redisConfig);

// Event listener for errors
redis.on('error', (err: Error) => {
    console.error('Redis connection error:', err);
});

// Event listener for successful connection
redis.on('connect', () => {
    console.log('Connected to Redis');
});

// Optionally: Function to demonstrate Redis usage
export async function checkRedisConnection(): Promise<void> {
    try {
        const response = await redis.ping();
        console.log('Redis Ping Response:', response);
    } catch (err) {
        console.error('Error pinging Redis:', err);
    }
}
