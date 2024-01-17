import { Anchor, Stack, Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute, Link } from "@tanstack/react-router";
import { postsQueryOptions } from "../../../../services/posts.service";

export const Route = new FileRoute("/_main-layout/examples/posts/").createRoute(
	{
		loader: ({ context: { queryClient } }) =>
			queryClient.ensureQueryData(postsQueryOptions),
		component: PostsRoute,
	},
);

function PostsRoute() {
	const postsQuery = useSuspenseQuery(postsQueryOptions);
	const posts = postsQuery.data;

	return (
		<div className="p-2">
			<Title>Posts</Title>
			<Stack mt="md">
				{posts.map((post) => {
					return (
						<Anchor
							key={post.id}
							component={Link}
							to="/examples/posts/$postId"
							params={{
								postId: post.id,
							}}
						>
							{post.title}
						</Anchor>
					);
				})}
			</Stack>
		</div>
	);
}
