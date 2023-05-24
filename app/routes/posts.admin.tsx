import type { Post } from "@prisma/client";
import { Await, Link, Outlet, useFetcher } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Suspense } from "react";
import invariant from "tiny-invariant";
import { deletePost } from "~/models/post.server";
import { requireUser } from "~/session.server";
import { useMatchesData } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  return await requireUser(request);
};

export const action = async ({ request }: ActionArgs) => {
  await requireUser(request);
  const formData = await request.formData();
  const slug = formData.get("slug");

  invariant(typeof slug === "string", "slug must be a string");

  return json({ post: await deletePost(slug) });
};

export default function PostAdmin() {
  const { posts } = useMatchesData("root") as { posts: Post[] };
  const fetcher = useFetcher<typeof action>();
  const isLoading = fetcher.state !== "idle";

  return (
    <div className="mx-auto mb-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-6xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            <Suspense>
              <Await resolve={posts}>
                {(posts) =>
                  posts.map((post) => (
                    <li key={post.slug}>
                      <Link to={`/posts/${post.slug}`} className="underline">
                        {post.title}
                      </Link>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => fetcher.submit({ slug: post.slug }, { method: "post" })}
                      >
                        🗑️
                      </button>
                    </li>
                  ))
                }
              </Await>
            </Suspense>
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
