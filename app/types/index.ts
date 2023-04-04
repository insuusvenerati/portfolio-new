export type Technology = {
  name: string;
  url: string;
  image: string;
};

export type NavLink = {
  name: string;
  href: string;
  position?: "left" | "right";
};

export type Routes = {
  id: string;
  path: string;
  file: string;
  children: Child[];
};

export type Child = {
  id: string;
  index?: boolean;
  file: string;
  path?: string;
  children?: Child[];
};
