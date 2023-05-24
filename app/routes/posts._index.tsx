import { Await, Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { defer } from "@remix-run/server-runtime";
import { Suspense } from "react";
import { getPosts } from "~/models/post.server";

export const meta = () => [{ title: "Blog" }];

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  const posts = getPosts(search);

  return defer({ posts });
};

const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <main className="container mx-auto mb-auto flex flex-col gap-6">
      <h1 className="py-6 text-6xl">Posts</h1>
      <Form method="GET">
        <label className="flex flex-col rounded-md" htmlFor="search">
          Search
          <input
            className="h-8 rounded-md bg-gray-600 p-2"
            type="text"
            name="search"
            id="search"
            defaultValue={searchParams.get("search") ?? ""}
          />
        </label>
      </Form>
      <ul className="list-disc">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await
            errorElement={<h1 className="text-red-500">Error getting posts 🥺</h1>}
            resolve={posts}
          >
            {(posts) =>
              posts.map((post) => (
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
