import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";
import { navLinks } from "~/constants";
import { Nav } from "./Nav";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full flex-col justify-between bg-slate-800">
      <div className="align-center flex justify-between p-2">
        <Link className="text-2xl font-semibold" to="/">
          Sean Norwood
        </Link>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-btn">
          <Menu width={36} height={36} />
        </label>
        <nav className="menu">
          <Nav links={navLinks} />
          <label htmlFor="menu-toggle" className="close-btn"></label>
        </nav>
      </div>
      {children}
      <footer className="mb-4 bg-slate-800">
        <p className="text-center">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a href="https://twitter.com/stiforr" className="text-blue-500 hover:text-blue-400">
            Sean Norwood
          </a>
        </p>
      </footer>
    </div>
  );
};
