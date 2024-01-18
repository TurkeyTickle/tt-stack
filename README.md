# Introduction

TurkeyTickle Stack is a prescriptive, opinionated project template for a front-end web development.

## Key Dependencies

- pnpm ([Docs](https://pnpm.io/installation)) - Package manager
- Vite ([Docs](https://vitejs.dev/)) - Build tool, HMR
- React ([Docs](https://react.dev/)) - UI Framework
- Mantine ([Docs](https://mantine.dev/) ) - UI Components
- Mantine DataTable ([Docs](https://icflorescu.github.io/mantine-datatable/)) - Data tables
- Tabler Icons ([Docs](https://tabler.io/docs/getting-started)) - Icons
- Biome ([Docs](https://biomejs.dev/)) - Formatting, Linting
- Zod ([Docs](https://zod.dev/)) - Schema validation for models and forms
- Zustand ([Docs](https://zustand-demo.pmnd.rs/)) - App state management
- TanStack Query ([Docs](https://tanstack.com/query/latest/docs/react/overview)) - API-sourced data state management
- Axios ([Docs](https://axios-http.com/docs/intro)) - HTTP
- TanStack Router ([Docs](https://tanstack.com/router)) - Routing

## Project Structure

The root directory contains several configuration files:

- `.editorconfig` (EditorConfig configuration) - Enforces consistent indenting and line endings with the help of the EditorConfig VSCode extension (included in [recommended extensions](#Recommended Extensions))
- `biome.json` (Biome configuration) - Automatically formats and lints code with the help of the Biome VSCode extensions (included in [recommended extensions](#Recommended Extensions))
- `postcss.config.cjs` (PostCSS configuration) - Required by Mantine and defines responsive breakpoint CSS variables. These can be modified based on project needs.
- `tsr.config.json` (TanStack Router Vite extension configuration) - While the Vite dev server is running and watching for file changes (`pnpm run dev`), the TanStack Router Vite extension watches the `src/routes` directory for changes and automatically regenerates the `src/route-tree.gen.ts` file. This generated file defines all page routes for the application, and provides type-safety for route paths. See the [routing section](#Routing) for more information on the file-based routing approach.
- `tsconfig.json` and `tsconfig.vite.json` (TypeScript configuration) - Defines several settings that are required for Vite/React, but also includes TypeScript strictness rules. A full list of rules and what they mean can be found [here](https://www.typescriptlang.org/tsconfig).
- `vite.config.ts` (Vite configuration) - Contains build settings and extensions like the TanStack Router extension mentioned above.
- `.env`, `env.dev`, `.env.uat`, `.env.prod` (dotenv configuration) - Vite uses these files to provide different sets of environment variables to the app based on the environment the app is running in. See the [Vite Env documentation](https://vitejs.dev/guide/env-and-mode) for more info. All custom environment variables should be added to the `src/env.d.ts` file, which provides type-safety for these environment variables throughout the rest of the application.

The `src` directory is where the main app code lives, and contains several subdirectories:

- `assets` - Static assets that are required by the application
- `components` - All reusable components. See the [Components](#Components) section for more info.
- `models` - Data models and enums. See the [Models](#Models) section for more info the modeling approach.
- `routes` - Contains "route" components. In general, each file in this directory maps directly to a URL route, but it also contains certain files like layout files (prefixed with a single underscore). See the [Routing](#Routing) section for more info.
- `services` - Contains groups of functions that call API endpoints and return data. See [API Queries](#API Queries) section for more info.
- `state` - Contains client-side state management stores. For example, `src/state/app.store.ts` contains a store that saves and retrieves whether the app drawer on the main layout is open or closed from browser local storage.
- `theme` - Contains files related to Mantine theme customization.

## Debugging (VS Code)

The `.vscode` directory contains `launch.json` and `tasks.json` files that tell VS Code how to build the application and launch the application in a browser window that can be debugged directly from VS Code. To run the dev server and launch a debuggable browser window, go to the `Run and Debug` tab in the sidebar in VSCode, select either `Debug Client (Edge)` or `Debug Client (Chrome)`,  then press the `F5` key. You should now be able to set breakpoints in React code in VS Code.

If you don't need a debugger and would rather just start the dev server and open the page in a browser manually, you can run the default build task by pressing `ctrl+shift+b` (windows) or `cmd+shift+b` (mac), or you can run the `pnpm run dev` command from a terminal at the project root.

## Components

 All components that do not map directly to a URL route belong in the `routes` directory. These are components that are meant to be used from *within* route components, so a component requires things like a ID that comes from the route, that ID should be passed into the component as a prop. When a route component needs to be able to respond to an action that occurs within the component, a function prop should be passed from the route component to the shared component and called when the event occurs so the route component can respond appropriately. See the simplified examples below or `src/components/examples/users/user-form.tsx` for a more detailed example.
### Shared component example
```tsx
interface Props {
	user: UserModel;
	onSaved: () => void;
}
 
function UserForm({ user, onSaved }: Props) {
	return (
		//...omitted form fields
		<Button onClick={() => onSaved()}>Save</Button>
	)
}
```
### Usage in route component 
```tsx
<UserForm
	user={user}
	onSaved={() => navigate({ to: "/examples/users" })}
/>
```

## Routing

### File-based Routing Strategy

Page routes are handled by TanStack Router using a file-based strategy. This means that application routes in the URL almost directly match the structure of the files in the `src/routes` directory. See this section of the [TanStack Router](https://tanstack.com/router/v1/docs/guide/file-based-routing#file-naming-conventions) documentation for details on route file naming conventions.

### Route Loaders

When possible, TanStack Router should be combined with TanStack Query to retrieve data from an API that is required to fully load the page as part of the navigation process. This can be accomplished by providing the route with a "loader" function. See `src/routes/_main-layout/examples/users/$userId.index.tsx` for a detailed example of this. To help explain the benefits of this approach, consider the following example.

When editing a user, the application flow usually goes something like this:

1. The user selects an item from a list
2. The user clicks an "edit" button
3. The application navigates to the edit route and renders the edit form
4. The application queries the API for the item's details, showing the user a spinner
5. The application populates the form with the result from the API

The combination of TanStack Router/Query provides the ability to do the last three steps in parallel, making the application feel much more responsive. In some cases, the route's data can even be prefetched when the user hovers over the "edit record" button, which can result essentially zero perceptible load time when the user clicks the button.

This is purely a UX optimization and may not always be worth implementing, but in some cases it's an easy win and should be considered on a case-by-case basis. 

When running the application in local development mode, the TanStack Router DevTools will appear in the bottom right corner of the page. These dev tools can be used to view the full route tree and information about each route. These dev tools are excluded from UAT and Prod builds.

## API Queries

API requests are handled with a combination of TanStack Query and Axios. Axios is responsible for the actual HTTP request, while TanStack Query sits on top providing things like result caching, retries, and exponential backoff.
### Axios

All API requests should use the Axios instance that is exported from `src/axios-instance.ts`. This instance provides standard request configuration and important interceptors that can do things like automatically redirect to a login page if a session expires, or display a toast notification telling the user that something went wrong when an API request fails.

### TanStack Query

TanStack Query provides two primary React hooks - `useQuery` and `useMutation`. Examples of the use of both of these hooks can be found at `src/routes/_main-layout/examples/users/index.tsx` and `src/routes/_main-layout/examples/users/$userId.index.tsx`. Both hooks provide caching, retries, and exponential backoff by default, but can be overridden as needed. 

When running the application in a local development environment, the TanStack Query DevTools will appear in the bottom-left corner of the page. These dev tools can be used to monitor the status of all queries and mutations, and to do helpful things like invalidate caches. These dev tools are excluded from UAT and Prod builds.

## Models

TODO: Explain models with zod

## Form Validation

TODO: Explain schema validation with zod and Mantine forms

## Styling

In general, it's easiest to rely on Mantine components to handle common styling tasks. For example, the [Stack Component](https://mantine.dev/core/stack/) is useful to stack items vertically, while the [Group Component](https://mantine.dev/core/group/) is useful for aligning items horizontally. Mantine components are designed to property support theming and light/dark mode, as well as providing consistent values for things like padding and margin. Before resorting to using style attributes or CSS files to style components, check the Mantine library to see if what you're wanting to be accomplished can easily be achieved with an out-of-the-box component. If Mantine does not provide a way to properly style your component, [CSS modules](https://mantine.dev/styles/css-modules/) should be used.

## Recommended Extensions

When the root project directory is opened in VSCode, you will see a notification to install recommended extensions. It is highly recommended to install these extensions because they will enable auto-formatting and linting to keep code style as consistent as possible. If code is pushed with lint errors, the CI/CD pipelines may fail and the lint error will need to be fixed. All recommended extensions are listed at `.vscode/extensions.json`.

## Auto-formatting and Linting

If the recommended formatting and linting VSCode extensions are installed, all code will be constantly checked for lint errors, and files will be automatically formatted on save. The linting rules mostly come from a ["recommended" set of rules from Biome](https://biomejs.dev/linter/rules/), but can easily be modified based on team preferences.
