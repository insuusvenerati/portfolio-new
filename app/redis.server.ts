import { redisCacheAdapter } from "cachified";
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export const cache = redisCacheAdapter(redis);
