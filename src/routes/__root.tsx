import {
	ActionIcon,
	AppShell,
	Burger,
	Container,
	Group,
	Skeleton,
	useMantineColorScheme,
} from "@mantine/core";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { IconSun, IconMoon } from "@tabler/icons-react";

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
					collapsed: { mobile: !opened },
				}}
				padding="md"
			>
				<AppShell.Header>
					<Group px="md" h="100%" w="100%" justify={"space-between"}>
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
						<ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
							{colorScheme === "dark" ? <IconSun /> : <IconMoon />}
						</ActionIcon>
					</Group>
				</AppShell.Header>
				<AppShell.Navbar p="md">
					{Array(15)
						.fill(0)
						.map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Skeleton key={index} h={28} mt="sm" animate={false} />
						))}
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
