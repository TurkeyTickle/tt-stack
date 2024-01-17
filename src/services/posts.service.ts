import { axiosInstance } from "@/axios-instance";
import { postSchema, PostModel } from "@/models/example/post.model";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

const postsUrl = `${import.meta.env.VITE_EXAMPLE_API_URL}/posts`;


// GET /posts

const getPosts = async () => {
  const data = await axiosInstance.get(postsUrl).then(r => r.data);
  return z.array(postSchema).parse(data);
}

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: getPosts
})


// GET /post/$id

const getPost = async (id: number) => {
  const data = await axiosInstance.get(`${postsUrl}/${id}`).then(r => r.data);
  return postSchema.parse(data);
};

export const postQueryOptions = (id: number) => queryOptions({
  queryKey: ['posts', { id }],
  queryFn: () => getPost(id)
})


// PATCH /post/$id

const patchPost = async (post: PostModel) => {
  const data = await axiosInstance.patch(`${postsUrl}/${post.id}`, post).then(r => r.data).catch(e => console.log(e));
  return postSchema.parse(data);
}

export const useUpdatePostMutation = (postId: number) => {
  return useMutation({
    mutationKey: ["posts", "update", postId],
    mutationFn: patchPost
  })
}
