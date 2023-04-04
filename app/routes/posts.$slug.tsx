import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [{ title: data.post.title }];

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  invariant(post, `Post "${params.slug}" not found`);

  const html = marked(post.markdown);
  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto mb-auto max-w-4xl py-6">
      <h1 className="my-6 border-b-2 text-center text-6xl">{post.title}</h1>
      <article
        className="prose prose-invert lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
