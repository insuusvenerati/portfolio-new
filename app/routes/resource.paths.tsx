import { json } from "@remix-run/server-runtime";
import { extractPaths } from "~/utils";
import routes from "../../routes.json";

export const loader = async () => {
  const paths = extractPaths(routes);
  return json(paths);
};
