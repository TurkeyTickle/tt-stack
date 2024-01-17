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
import { PostModel, postSchema } from "@/models/example/post.model";
import { useUpdatePostMutation } from "@/services/posts.service";

interface Props {
	post: PostModel;
	onSaved: () => void;
}

function PostForm({ post, onSaved }: Props) {
	const updatePostMutation = useUpdatePostMutation(post.id);

	useEffect(() => {
		if (updatePostMutation.isSuccess) {
			notifications.show({
				message: "Post successfully updated",
			});

			onSaved?.();
		}
	}, [updatePostMutation.isSuccess, onSaved]);

	const form = useForm({
		initialValues: post,
		validate: zodResolver(postSchema),
	});

	return (
		<form
			onSubmit={form.onSubmit((values) => {
				return updatePostMutation.mutate(values);
			})}
		>
			<Fieldset
				variant="unstyled"
				w="100%"
				disabled={updatePostMutation?.status === "pending"}
			>
				<SimpleGrid cols={{ sm: 2 }}>
					<NumberInput
						withAsterisk
						disabled
						label="Post ID"
						{...form.getInputProps("id")}
					/>
					<NumberInput
						withAsterisk
						disabled
						label="User ID"
						{...form.getInputProps("userId")}
					/>
					<TextInput
						withAsterisk
						label="Title"
						{...form.getInputProps("title")}
					/>
					<TextInput
						withAsterisk
						label="Body"
						{...form.getInputProps("body")}
					/>
				</SimpleGrid>
			</Fieldset>
			<Group justify="flex-end" mt="xl">
				<Button
					type="submit"
					loading={updatePostMutation?.status === "pending"}
					loaderProps={{ type: "dots" }}
					disabled={updatePostMutation?.status === "pending"}
				>
					Save
				</Button>
			</Group>
		</form>
	);
}

export default PostForm;
