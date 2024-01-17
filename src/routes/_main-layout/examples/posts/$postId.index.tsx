import { FileRoute, useNavigate } from "@tanstack/react-router";
import PostForm from "../../../../components/examples/posts/post-form";
import { postQueryOptions } from "../../../../services/posts.service";
import { Paper, Title } from "@mantine/core";

export const Route = new FileRoute("/_main-layout/examples/posts/$postId/").createRoute({
	loader: ({ context: { queryClient }, params: { postId } }) =>
		queryClient.ensureQueryData(postQueryOptions(+postId)),
	component: PostEditRoute,
});

function PostEditRoute() {
	const navigate = useNavigate();
	const post = Route.useLoaderData();

	return (
		<Paper withBorder shadow="md" p="md">
			<Title mb="xl">Edit Post</Title>
			<PostForm
				post={post}
				onSaved={() => navigate({ to: "/examples/posts" })}
			/>
		</Paper>
	);
}

export default PostEditRoute;
