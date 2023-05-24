import type { Post } from "@prisma/client";
import { cachified } from "cachified";
import { prisma } from "~/db.server";
import { cache, redis } from "~/redis.server";

export const getPosts = async (search: string | null) => {
  const cacheKey = search ? `posts-${search}` : "posts";
  const ttl = search ? 60 * 60 : 60 * 60 * 1000;
  // const cachedPosts = await redis.get(cacheKey);

  // if (cachedPosts) return JSON.parse(cachedPosts) as Post[];
  // const posts = await prisma.post.findMany();
  // await redis.set(cacheKey, JSON.stringify(posts));
  await redis.connect();

  return await cachified({
    cache: cache,
    key: cacheKey,
    async getFreshValue() {
      return await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search ?? undefined,
              },
            },
            {
              markdown: {
                contains: search ?? undefined,
              },
            },
          ],
        },
      });
    },
    ttl,
  }).finally(async () => await redis.disconnect());
};

export const getPost = async (slug: string) => {
  const postCacheKey = `post:${slug}`;
  await redis.connect();
  // const cachedPost = await redis.get(postCacheKey);

  // if (cachedPost) return JSON.parse(cachedPost) as Post;
  return await cachified({
    cache: cache,
    key: postCacheKey,
    async getFreshValue() {
      return await prisma.post.findUnique({
        where: {
          slug,
        },
      });
    },
    ttl: 60 * 60 * 1000, // 1 hour
  });
};

export const createPost = async (post: Pick<Post, "markdown" | "slug" | "title" | "userId">) => {
  const postCacheKey = `post:${post.slug}`;
  await redis.connect();
  // Add single post to Redis cache
  // await redis.set(postCacheKey, JSON.stringify(post));

  // // Append post to list of posts in Redis cache
  // const cachedPosts = await redis.get(cacheKey);
  // if (cachedPosts) {
  //   const posts = JSON.parse(cachedPosts) as Post[];

  //   posts.push(post as Post);
  //   await redis.set(cacheKey, JSON.stringify(posts));
  // }

  return await cachified({
    cache: cache,
    key: postCacheKey,
    async getFreshValue() {
      return await prisma.post.create({
        data: post,
      });
    },
    ttl: 60 * 60 * 1000, // 1 hour
  });
};

export const deletePost = async (slug: string) => {
  // Delete single post from Redis cache
  const postCacheKey = `post:${slug}`;
  await redis.connect();
  // await redis.del(postCacheKey);

  // // Remove post from list of posts in Redis cache
  // const cachedPosts = await redis.get(cacheKey);
  // if (cachedPosts) {
  //   const posts = JSON.parse(cachedPosts) as Post[];

  //   const index = posts.findIndex((post) => post.slug === slug);
  //   if (index > -1) {
  //     posts.splice(index, 1);
  //     await redis.set(cacheKey, JSON.stringify(posts));
  //   }
  // }
  return await cachified({
    cache: cache,
    key: postCacheKey,
    async getFreshValue() {
      return await prisma.post.delete({
        where: {
          slug,
        },
      });
    },
    ttl: 60 * 60 * 1000, // 1 hour
  });
};
