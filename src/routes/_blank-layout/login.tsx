import { Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank-layout/login")({
  component: LoginRoute,
});

function LoginRoute() {
  return <Title>Login</Title>;
}

export default LoginRoute;
