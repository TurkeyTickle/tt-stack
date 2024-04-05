import {
  SimpleGrid,
  TextInput,
  Group,
  Button,
  NumberInput,
  Fieldset,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { type UserModel, userSchema } from "@/models/examples/user.model";
import { useUpdateUserMutation } from "@/services/examples/users.service";

interface Props {
  user: UserModel;
  onSaved: () => void;
}

function UserForm({ user, onSaved }: Props) {
  const updateUserMutation = useUpdateUserMutation(user.id);

  useEffect(() => {
    if (updateUserMutation.isSuccess) {
      notifications.show({
        title: "User updated",
        message:
          "NOTE: this is mock data, so you will not see changes reflected in the Users list.",
      });

      onSaved?.();
    }
  }, [updateUserMutation.isSuccess, onSaved]);

  const form = useForm({
    initialValues: user,
    validate: zodResolver(userSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        return updateUserMutation.mutate(values);
      })}
    >
      <Fieldset
        variant="unstyled"
        w="100%"
        disabled={updateUserMutation?.status === "pending"}
      >
        <SimpleGrid cols={{ sm: 2 }}>
          <NumberInput
            withAsterisk
            disabled
            label="User ID"
            {...form.getInputProps("id")}
          />
          <TextInput
            withAsterisk
            label="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="First Name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            {...form.getInputProps("last_name")}
          />
        </SimpleGrid>
      </Fieldset>
      <Group justify="flex-end" mt="xl">
        <Button
          type="submit"
          loading={updateUserMutation?.status === "pending"}
          loaderProps={{ type: "dots" }}
          disabled={updateUserMutation?.status === "pending"}
        >
          Save
        </Button>
      </Group>
    </form>
  );
}

export default UserForm;
