import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/test-route-1").createRoute({
	component: TestRoute1Route,
});

function TestRoute1Route() {
	return (
		<div className="p-2">
			<Title>Test Route 1</Title>
		</div>
	);
}
