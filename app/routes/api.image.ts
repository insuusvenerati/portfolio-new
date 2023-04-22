import type { LoaderArgs } from "@remix-run/server-runtime";
import { sharpTransformer } from "remix-image-sharp";
import { MemoryCache, imageLoader } from "remix-image/server";

const config = {
  selfUrl:
    process.env.NODE_ENV === "production"
      ? "https://stiforr-portfolio.fly.dev"
      : "http://localhost:3000",
  transformer: sharpTransformer,
  cache: new MemoryCache(),
};

export const loader = ({ request }: LoaderArgs) => {
  return imageLoader(config, request);
};
