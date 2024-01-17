import PersonForm from "../../components/person/person-form";
import { Title } from "@mantine/core";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute("/_main-layout/").createRoute({
	component: HomeRoute,
});

function HomeRoute() {
	return (
		<div className="p-2">
			<Title>Home</Title>
			<PersonForm />
		</div>
	);
}
