import { useMatches } from "@remix-run/react";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import type { User } from "~/models/user.server";
import type { Routes } from "../types";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id: string): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const similarityScore = (routePath: string, locationPath: string) => {
  const m = routePath.length;
  const n = locationPath.length;
  const matrix = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (routePath.charAt(i - 1) === locationPath.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[m][n];
  const similarity = 1 - distance / Math.max(m, n);
  return similarity;
};

export const extractPaths = (routes: Routes[]) => {
  const paths: string[] = [];
  routes[0].children.forEach((item) => {
    if (item.path) {
      paths.push(item.path);
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.path) {
          paths.push(child.path);
        }
      });
    }
  });
  return paths;
};
