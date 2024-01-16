import { Button, Code, Title, useMantineColorScheme } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute('/').createRoute({
	component: HomeRoute,
});

function HomeRoute() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<div className="p-2">
			<Title>Welcome Home!</Title>
			<Button onClick={() => toggleColorScheme()}>{colorScheme}</Button>
			<Code>This is code</Code>
		</div>
	);
}
