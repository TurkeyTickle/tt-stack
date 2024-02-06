import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank-layout")({
  component: BlankLayout,
});

function BlankLayout() {
  return <Outlet />;
}

export default BlankLayout;
