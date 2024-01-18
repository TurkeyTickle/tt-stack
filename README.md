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
- `tsconfig.json` and `tsconfig.vite.json` (TypeScript configuration) - Defines several settings that are required for Vite/React, but also includes TypeScript strictness rules. A full list of rules and what they mean can be found [here]([TypeScript: TSConfig Reference - Docs on every TSConfig option (typescriptlang.org)](https://www.typescriptlang.org/tsconfig)).
- `vite.config.ts` (Vite configuration) - Contains build settings and extensions like the TanStack Router extension mentioned above.
- `.env`, `env.dev`, `.env.uat`, `.env.prod` (dotenv configuration) - Vite uses these files to provide different sets of environment variables to the app based on the environment the app is running in. See the [Vite Env documentation]([Env Variables and Modes | Vite (vitejs.dev)](https://vitejs.dev/guide/env-and-mode)) for more info. All custom environment variables should be added to the `src/env.d.ts` file, which provides type-safety for these environment variables throughout the rest of the application.

The `src` directory is where the main app code lives, and contains several subdirectories:

- `assets` - Static assets that are required by the application
- `components` - All reusable components. See the [Components](#Components) section for more info.
- `models` - Data models and enums. See the [Models](#Models) section for more info the modeling approach.
- `routes` - Contains "route" components. In general, each file in this directory maps directly to a URL route, but it also contains certain files like layout files (prefixed with a single underscore). See the [Routing](#Routing) section for more info.
- `services` - Contains groups of functions that call API endpoints and return data. See [API Queries](#API Queries) section for more info.
- `state` - Contains client-side state management stores. For example, `src/state/app.store.ts` contains a store that saves and retrieves whether the app drawer on the main layout is open or closed from browser local storage.
- `theme` - Contains files related to Mantine theme customization.
## Debugging (VS Code)

TODO: Explain default debug/build configuration
## Components

 Note that none of the components within this directory should map directly to a URL route. These are components that are meant to be used from *within* route components, so if these components require things like IDs that come from the route, they should be passed in as props. 
 
TODO: Explain library choice motivation
## Routing

TODO: Explain file based routing using vite plugin and route generation.
## API Queries

TODO: Explain basic use of TanStack Query
## Models

TODO: Explain models (zod)
## Form Validation

TODO: Explain schema validation
## Styling

In general, it's easiest to rely on Mantine components to handle common styling tasks. For example, the [Stack Component](https://mantine.dev/core/stack/) is useful to stack items vertically, while the [Group Component](https://mantine.dev/core/group/) is useful for aligning items horizontally. Mantine components are designed to property support theming and light/dark mode, as well as providing consistent values for things like padding and margin. Before resorting to using style attributes or CSS files to style components, check the Mantine library to see if what you're wanting to be accomplished can easily be achieved with an out-of-the-box component. If Mantine does not provide a way to properly style your component, [CSS modules](https://mantine.dev/styles/css-modules/) should be used.
## Recommended Extensions

When the root project directory is opened in VSCode, you will see a notification to install recommended extensions. It is highly recommended to install these extensions because they will enable auto-formatting and linting to keep code style as consistent as possible. If code is pushed with lint errors, the CI/CD pipelines may fail and the lint error will need to be fixed. All recommended extensions are listed at `.vscode/extensions.json`.
## Auto-formatting and Linting

If the recommended formatting and linting VSCode extensions are installed, all code will be constantly checked for lint errors, and files will be automatically formatted on save. The linting rules mostly come from a ["recommended" set of rules from Biome](https://biomejs.dev/linter/rules/), but can easily be modified based on team preferences.


## TODO
