/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  future: {
    v2_meta: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    unstable_tailwind: false,
    unstable_postcss: true,
    v2_normalizeFormMethod: true,
  },
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["marked"],
};
