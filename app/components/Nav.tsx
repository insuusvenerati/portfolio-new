import { Link } from "@remix-run/react";
import type { NavLink } from "~/types";

export const Nav = ({ links = [] }: { links: NavLink[] }) => {
  return (
    <nav className="w-full">
      <ul className="flex flex-col gap-6 lg:items-center">
        {links.map((link) => (
          <li
            key={link.href}
            className={
              link.position === "left" ? "lg:col-span-8 lg:text-xl" : "text-center lg:text-end"
            }
          >
            <Link to={link.href} className="minimal-link text-4xl">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
