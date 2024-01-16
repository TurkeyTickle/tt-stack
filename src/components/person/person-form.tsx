import { Box, Button, Group, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { genderEnum } from "../../models/gender";
import { personSchema } from "../../models/person";

function PersonForm() {
	const form = useForm({
		validate: zodResolver(personSchema),
	});

	return (
		<Box>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<Group grow>
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
				</Group>
				<Group grow>
					<Select
						withAsterisk
						label="Gender"
						data={genderEnum.options}
						{...form.getInputProps("gender")}
						allowDeselect={false}
					/>
					<DatePickerInput
						withAsterisk
						label="Date of Birth"
						{...form.getInputProps("dob")}
					/>
				</Group>
				<Group justify="flex-end" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
}

export default PersonForm;
