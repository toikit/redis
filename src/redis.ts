// Create a Redis client
import { createClient } from 'redis';
import { config } from '@toikit/core';

let redisConnection: any = {};

export const redis = (name:string = 'default') => {
  if (redisConnection[name]) return redisConnection[name];

  let redisconfig = config('redis');
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
