import Redis from "ioredis";

export const client = new Redis(process.env.REDIS_URL ?? "redis://[::1]:6379", {
  family: 6,
});
