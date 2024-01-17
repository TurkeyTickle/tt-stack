import { Route as rootRoute } from './routes/__root'
import { Route as TestRoute2Import } from './routes/test-route-2'
import { Route as TestRoute1Import } from './routes/test-route-1'
import { Route as IndexImport } from './routes'

const TestRoute2Route = TestRoute2Import.update({
  path: '/test-route-2',
  getParentRoute: () => rootRoute,
} as any)

const TestRoute1Route = TestRoute1Import.update({
  path: '/test-route-1',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/test-route-1': {
      preLoaderRoute: typeof TestRoute1Import
      parentRoute: typeof rootRoute
    }
    '/test-route-2': {
      preLoaderRoute: typeof TestRoute2Import
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  TestRoute1Route,
  TestRoute2Route,
])
