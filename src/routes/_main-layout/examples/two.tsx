import { Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main-layout/examples/two")({
  component: ExampleTwo,
});

function ExampleTwo() {
  return (
    <div className="p-2">
      <Title>Example Route 2</Title>
    </div>
  );
}
