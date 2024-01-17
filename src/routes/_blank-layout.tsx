import { FileRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/_blank-layout").createRoute({
	component: BlankLayout,
});

function BlankLayout() {
	return <Outlet />;
}

export default BlankLayout;
