import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";
import { client as redis } from "~/redis.server";

const cacheKey = "posts";

export const getPosts = async () => {
  const cachedPosts = await redis.get(cacheKey);

  if (cachedPosts) return JSON.parse(cachedPosts) as Post[];
  const posts = await prisma.post.findMany();
  await redis.set(cacheKey, JSON.stringify(posts));

  return posts;
};

export const getPost = async (slug: string) => {
  const postCacheKey = `post:${slug}`;
  const cachedPost = await redis.get(postCacheKey);

  if (cachedPost) return JSON.parse(cachedPost) as Post;
  return await prisma.post.findUnique({
    where: {
      slug,
    },
  });
};

export const createPost = async (post: Pick<Post, "markdown" | "slug" | "title" | "userId">) => {
  const postCacheKey = `post:${post.slug}`;
  // Add single post to Redis cache
  await redis.set(postCacheKey, JSON.stringify(post));

  // Append post to list of posts in Redis cache
  const cachedPosts = await redis.get(cacheKey);
  if (cachedPosts) {
    const posts = JSON.parse(cachedPosts) as Post[];

    posts.push(post as Post);
    await redis.set(cacheKey, JSON.stringify(posts));
  }

  return await prisma.post.create({
    data: post,
  });
};

export const deletePost = async (slug: string) => {
  // Delete single post from Redis cache
  const postCacheKey = `post:${slug}`;
  await redis.del(postCacheKey);

  // Remove post from list of posts in Redis cache
  const cachedPosts = await redis.get(cacheKey);
  if (cachedPosts) {
    const posts = JSON.parse(cachedPosts) as Post[];

    const index = posts.findIndex((post) => post.slug === slug);
    if (index > -1) {
      posts.splice(index, 1);
      await redis.set(cacheKey, JSON.stringify(posts));
    }
  }
  return await prisma.post.delete({
    where: {
      slug,
    },
  });
};
