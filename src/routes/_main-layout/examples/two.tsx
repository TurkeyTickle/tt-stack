import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/_main-layout/examples/two").createRoute({
	component: ExampleTwo,
});

function ExampleTwo() {
	return (
		<div className="p-2">
			<Title>Example Route 2</Title>
		</div>
	);
}
