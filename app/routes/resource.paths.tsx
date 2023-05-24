import { json } from "@remix-run/server-runtime";
import routes from "../../routes.json";
import { extractPaths } from "~/util/utils";

export const loader = async () => {
  const paths = extractPaths(routes);
  return json(paths);
};
