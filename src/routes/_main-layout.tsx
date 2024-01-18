import { useAppStore } from "@/state/app.store";
import {
	AppShell,
	Flex,
	Burger,
	ActionIcon,
	Stack,
	NavLink,
	Container,
	useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon, IconHome } from "@tabler/icons-react";
import { FileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/_main-layout").createRoute({
	component: MainLayout,
});

function MainLayout() {
	const { drawerOpen, toggleDrawer } = useAppStore();
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !drawerOpen, desktop: !drawerOpen },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Flex h="100%" px="md" align="center" justify="space-between" gap="md">
					<Burger opened={drawerOpen} onClick={toggleDrawer} size="sm" />
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
					<NavLink href="#examples-parent-link" label="Examples" opened>
						<NavLink component={Link} label="Users" to="/examples/users" />
						<NavLink
							component={Link}
							label="Example Route 2"
							to="/examples/two"
						/>
					</NavLink>
				</Stack>
			</AppShell.Navbar>
			<AppShell.Main>
				<Container px="-md">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}

export default MainLayout;
