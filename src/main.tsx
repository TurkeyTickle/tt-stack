import React from "react";
import ReactDOM from "react-dom/client";
import { Router, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

// Set up a Router instance
const router = new Router({
	routeTree,
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
);
