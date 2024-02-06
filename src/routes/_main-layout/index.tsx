import { Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main-layout/")({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <div className="p-2">
      <Title>Home</Title>
    </div>
  );
}
