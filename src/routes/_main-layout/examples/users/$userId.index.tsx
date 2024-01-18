import { FileRoute, useNavigate } from "@tanstack/react-router";
import { Paper, Title } from "@mantine/core";
import UserForm from "@/components/examples/users/user-form";
import { userQueryOptions } from "@/services/examples/users.service";

export const Route = new FileRoute("/_main-layout/examples/users/$userId/").createRoute({
	parseParams: (params) => ({
		userId: +params.userId,
	}),
	stringifyParams: (params) => ({
		userId: params.userId.toString(),
	}),
	loader: (opts) =>
		opts.context.queryClient.ensureQueryData(
			userQueryOptions(+opts.params.userId),
		),
	component: UserEditRoute,
});

function UserEditRoute() {
	const navigate = useNavigate();
	const user = Route.useLoaderData();

	return (
		<Paper withBorder shadow="md" p="md">
			<Title mb="xl">Edit User</Title>
			<UserForm
				user={user}
				onSaved={() => navigate({ to: "/examples/users" })}
			/>
		</Paper>
	);
}

export default UserEditRoute;
