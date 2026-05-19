const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || undefined,
  lazyConnect: true,
  maxRetriesPerRequest: 1,
});

let connectPromise;

const ensureRedisConnected = async () => {
  if (redis.status === "ready") {
    return redis;
  }

  if (redis.status === "connecting" && connectPromise) {
    await connectPromise;
    return redis;
  }

  connectPromise = redis.connect().finally(() => {
    connectPromise = null;
  });

  await connectPromise;
  return redis;
};

redis.on("error", (error) => {
  console.error("Redis error:", error.message);
});

module.exports = {
  redis,
  ensureRedisConnected,
};
