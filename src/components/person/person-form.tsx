import { Button, Group, Select, SimpleGrid, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { relationshipStatusEnum } from "../../models/enums/relationship-status.enum";
import { personSchema } from "../../models/person.model";

function PersonForm() {
	const form = useForm({
		validate: zodResolver(personSchema),
	});

	return (
		<form onSubmit={form.onSubmit((values) => console.log(values))}>
			<SimpleGrid cols={{ sm: 2 }}>
				<TextInput
					withAsterisk
					label="First Name"
					{...form.getInputProps("firstName")}
				/>
				<TextInput
					withAsterisk
					label="Last Name"
					{...form.getInputProps("lastName")}
				/>
				<Select
					withAsterisk
					label="Relationship Status"
					data={relationshipStatusEnum.options}
					{...form.getInputProps("relationshipStatus")}
					allowDeselect={false}
				/>
				<DatePickerInput
					withAsterisk
					label="Date of Birth"
					{...form.getInputProps("dob")}
				/>
			</SimpleGrid>
			<Group justify="flex-end" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
		</form>
	);
}

export default PersonForm;
