// Create a Redis client
import { createClient } from 'redis';
import { getConfig } from '@toikit/toikit';

let redisConnection: any = {};

export const getRedis = (name:string = 'default') => {
  if (redisConnection[name]) return redisConnection[name];

  let redisconfig = getConfig('redis');
  let redis = createClient(redisconfig[name]);

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  // Connect the client
  redis.connect().then(() => {
    // Example usage
    console.log('Connect redis client');
  }).catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

  redisConnection[name] = redis;
  return redisConnection[name];
};
