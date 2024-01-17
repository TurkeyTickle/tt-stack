import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/test-route-2").createRoute({
	component: TestRoute2Route,
});

function TestRoute2Route() {
	return (
		<div className="p-2">
			<Title>Test Route 2</Title>
		</div>
	);
}
