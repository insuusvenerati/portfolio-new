import type { NavLink, Technology } from "~/types";
import remixLogo from "~/assets/images/remixLogo.png";

export const pageMeta = {
  title: "Sean Norwood",
  description:
    "I'm a web developer from Pensacola. I'm currently working with Remix, building new products from the ground up",
};

export const technologies: Technology[] = [
  { image: remixLogo, name: "Remix", url: "https://remix.run" },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207",
    name: "React",
    url: "https://reactjs.org",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201",
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/600px-Tailwind_CSS_Logo.svg.png?20211001194333",
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1024px-Postgresql_elephant.svg.png",
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
  },
];

export const navLinks: NavLink[] = [
  // { name: "Sean Norwood", href: "/", position: "left" },
  { name: "Github", href: "https://github.com/insuusvenerati" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sean-norwood/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];
