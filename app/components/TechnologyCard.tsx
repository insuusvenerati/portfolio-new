import type { Technology } from "~/types";

export const TechnologyCard = ({ tech }: { tech: Technology }) => {
  return (
    <a
      className="flex flex-col items-center justify-center rounded-sm bg-white p-4 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:scale-105"
      href={tech.url}
    >
      <img className="h-32 w-32 rounded-full" src={tech.image} alt={tech.name} />
      <h3 className="text-2xl text-black">{tech.name}</h3>
    </a>
  );
};
