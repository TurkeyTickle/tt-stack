import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import RouteLoader from "../components/common/route-loader";
import { routeTree } from "./route-tree.gen";

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: RouteLoader,
  defaultPendingMs: 250,
  defaultPendingMinMs: 500,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
