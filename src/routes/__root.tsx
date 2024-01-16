import { theme } from "@/theme/theme";
import { MantineProvider } from "@mantine/core";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import "@mantine/core/styles.css";

export const Route = new RootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<MantineProvider theme={theme}>
			<div className="p-4">
				<Outlet />
			</div>
			<TanStackRouterDevtools position="bottom-right" />
		</MantineProvider>
	);
}
