import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { V2_ErrorBoundaryComponent } from "@remix-run/server-runtime/dist/routeModules";
import { Layout } from "./components/Layout";
import { getUser } from "./session.server";
import styles from "./styles/index.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://upload.wikimedia.org" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const user = getUser(request);

  return json({
    user,
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Sean Norwood's portfolio" />
        <meta name="author" content="Sean Norwood" />
        <meta name="keywords" content="Sean Norwood, Portfolio" />
        <meta name="title" content="Sean Norwood's Portfolio" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Oops!</title>
          <Meta />
          <Links />
        </head>
        <body className="h-screen">
          <Layout>
            <main className="container mx-auto">
              <h1 className="text-center text-2xl">{error.data}</h1>
            </main>
          </Layout>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <Layout>
          <main className="container mx-auto">
            <h1 className="text-center text-2xl">{error.data}</h1>
          </main>
        </Layout>
      </body>
    </html>
  );
};
