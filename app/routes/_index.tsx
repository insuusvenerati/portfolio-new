import type { V2_MetaFunction } from "@remix-run/node";
import { TechnologyCard } from "~/components/TechnologyCard";
import { pageMeta, technologies } from "~/constants";

export const meta: V2_MetaFunction = () => [pageMeta];

export default function Index() {
  return (
    <main className="container mx-auto">
      <h1 className="text-6xl">Hello!</h1>
      <h2 className="text-4xl">I'm Sean Norwood</h2>

      <h2 className="mb-6 text-2xl">
        I'm a web developer from Pensacola. I'm currently working with
      </h2>
      <div className="container mx-auto grid grid-cols-2 gap-2 bg-slate-800 lg:grid-cols-5">
        {technologies.map((tech) => (
          <TechnologyCard key={tech.name} tech={tech} />
        ))}
      </div>
    </main>
  );
}
