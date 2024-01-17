import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/_blank-layout/login").createRoute({
	component: LoginRoute,
});

function LoginRoute() {
	return <Title>Login</Title>;
}

export default LoginRoute;
