import type { Post } from "@prisma/client";
import { Await, Link } from "@remix-run/react";
import { Suspense, useState } from "react";
import { useMatchesData } from "~/utils";

export const meta = () => [{ title: "Blog" }];

const Posts = () => {
  const { posts } = useMatchesData("root") as { posts: Post[] };
  const [search, setSearch] = useState("");

  return (
    <main className="container mx-auto mb-auto flex flex-col gap-6">
      <h1 className="py-6 text-6xl">Posts</h1>
      <label className="flex flex-col rounded-md" htmlFor="search">
        Search
        <input
          className="h-8 rounded-md bg-gray-600 p-2"
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <ul className="list-disc">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await resolve={posts}>
            {(posts) =>
              posts
                .filter((post) =>
                  post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                )
                .map((post) => (
                  <li key={post.slug}>
                    <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                  </li>
                ))
            }
          </Await>
        </Suspense>
      </ul>
    </main>
  );
};

export default Posts;
