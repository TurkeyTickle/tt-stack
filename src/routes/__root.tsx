import {
	ActionIcon,
	AppShell,
	Burger,
	Container,
	Flex,
	NavLink,
	Stack,
	useMantineColorScheme,
} from "@mantine/core";
import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
	IconSun,
	IconMoon,
	IconHome,
	IconNumber1,
	IconNumber2,
} from "@tabler/icons-react";

export const Route = new RootRoute({
	component: RootComponent,
});

function RootComponent() {
	const [opened, { toggle }] = useDisclosure();
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<>
			<AppShell
				header={{ height: 60 }}
				navbar={{
					width: 300,
					breakpoint: "sm",
					collapsed: { mobile: !opened, desktop: !opened },
				}}
				padding="md"
			>
				<AppShell.Header>
					<Flex
						h="100%"
						px="md"
						align="center"
						justify="space-between"
						gap="md"
					>
						<Burger opened={opened} onClick={toggle} size="sm" />
						<ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
							{colorScheme === "dark" ? <IconSun /> : <IconMoon />}
						</ActionIcon>
					</Flex>
				</AppShell.Header>
				<AppShell.Navbar pt="md">
					<Stack gap={0}>
						<NavLink
							component={Link}
							label="Home"
							to="/"
							leftSection={<IconHome size="1rem" stroke={1.5} />}
						/>
						<NavLink
							component={Link}
							label="Test Route 1"
							to="/test-route-1"
							leftSection={<IconNumber1 size="1rem" stroke={1.5} />}
						/>
						<NavLink
							component={Link}
							label="Test Route 2"
							to="/test-route-2"
							leftSection={<IconNumber2 size="1rem" stroke={1.5} />}
						/>
					</Stack>
				</AppShell.Navbar>
				<AppShell.Main>
					<Container>
						<Outlet />
					</Container>
				</AppShell.Main>
			</AppShell>
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
