import UsersList from "@/components/examples/users/users-list";
import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/_main-layout/examples/users/").createRoute(
	{
		component: UsersRoute,
	},
);

function UsersRoute() {
	return (
		<>
			<Title mb="md">Users</Title>
			<UsersList />
		</>
	);
}
