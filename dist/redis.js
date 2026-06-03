"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = void 0;
const redis_1 = require("./redis");
const core_1 = require("@toikit/core");
let redisConnection = {};
const getRedis = (name = 'default') => {
    if (redisConnection[name])
        return redisConnection[name];
    let redisconfig = (0, core_1.getConfig)('redis');
    let redis = (0, redis_1.createClient)(redisconfig[name]);
    redis.on('error', (err) => {
        console.error('Redis error:', err);
    });
    redis.connect().then(() => {
        console.log('Connect redis client');
    }).catch((err) => {
        console.error('Error connecting to Redis:', err);
    });
    redisConnection[name] = redis;
    return redisConnection[name];
};
exports.getRedis = getRedis;
//# sourceMappingURL=redis.js.map