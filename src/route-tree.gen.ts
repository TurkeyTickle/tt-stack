import { Route as rootRoute } from "./routes/__root"
import { Route as MainLayoutImport } from "./routes/_main-layout"
import { Route as BlankLayoutImport } from "./routes/_blank-layout"
import { Route as MainLayoutIndexImport } from "./routes/_main-layout/index"
import { Route as BlankLayoutLoginImport } from "./routes/_blank-layout/login"
import { Route as MainLayoutExamplesTwoImport } from "./routes/_main-layout/examples/two"
import { Route as MainLayoutExamplesUsersIndexImport } from "./routes/_main-layout/examples/users/index"
import { Route as MainLayoutExamplesUsersUserIdIndexImport } from "./routes/_main-layout/examples/users/$userId.index"

const MainLayoutRoute = MainLayoutImport.update({
  id: "/_main-layout",
  getParentRoute: () => rootRoute,
} as any)

const BlankLayoutRoute = BlankLayoutImport.update({
  id: "/_blank-layout",
  getParentRoute: () => rootRoute,
} as any)

const MainLayoutIndexRoute = MainLayoutIndexImport.update({
  path: "/",
  getParentRoute: () => MainLayoutRoute,
} as any)

const BlankLayoutLoginRoute = BlankLayoutLoginImport.update({
  path: "/login",
  getParentRoute: () => BlankLayoutRoute,
} as any)

const MainLayoutExamplesTwoRoute = MainLayoutExamplesTwoImport.update({
  path: "/examples/two",
  getParentRoute: () => MainLayoutRoute,
} as any)

const MainLayoutExamplesUsersIndexRoute =
  MainLayoutExamplesUsersIndexImport.update({
    path: "/examples/users/",
    getParentRoute: () => MainLayoutRoute,
  } as any)

const MainLayoutExamplesUsersUserIdIndexRoute =
  MainLayoutExamplesUsersUserIdIndexImport.update({
    path: "/examples/users/$userId/",
    getParentRoute: () => MainLayoutRoute,
  } as any)
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_blank-layout": {
      preLoaderRoute: typeof BlankLayoutImport
      parentRoute: typeof rootRoute
    }
    "/_main-layout": {
      preLoaderRoute: typeof MainLayoutImport
      parentRoute: typeof rootRoute
    }
    "/_blank-layout/login": {
      preLoaderRoute: typeof BlankLayoutLoginImport
      parentRoute: typeof BlankLayoutImport
    }
    "/_main-layout/": {
      preLoaderRoute: typeof MainLayoutIndexImport
      parentRoute: typeof MainLayoutImport
    }
    "/_main-layout/examples/two": {
      preLoaderRoute: typeof MainLayoutExamplesTwoImport
      parentRoute: typeof MainLayoutImport
    }
    "/_main-layout/examples/users/": {
      preLoaderRoute: typeof MainLayoutExamplesUsersIndexImport
      parentRoute: typeof MainLayoutImport
    }
    "/_main-layout/examples/users/$userId/": {
      preLoaderRoute: typeof MainLayoutExamplesUsersUserIdIndexImport
      parentRoute: typeof MainLayoutImport
    }
  }
}
export const routeTree = rootRoute.addChildren([
  BlankLayoutRoute.addChildren([BlankLayoutLoginRoute]),
  MainLayoutRoute.addChildren([
    MainLayoutIndexRoute,
    MainLayoutExamplesTwoRoute,
    MainLayoutExamplesUsersIndexRoute,
    MainLayoutExamplesUsersUserIdIndexRoute,
  ]),
])
