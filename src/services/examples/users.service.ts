import { axiosInstance } from "@/axios-instance";
import { PaginatedResponseModel, paginatedResponseSchema } from "@/models/examples/paged-result.model";
import { userSchema, UserModel } from "@/models/examples/user.model";
import { queryOptions, useMutation } from "@tanstack/react-query";

const baseUrl = `${import.meta.env.VITE_EXAMPLE_API_URL}/users`;

// GET /users
const getUsers = async (page: number, limit: number) =>
  await axiosInstance
    .get(`${baseUrl}?page=${page}&per_page=${limit}`)
    .then(r => paginatedResponseSchema(userSchema).parse(r.data));

export const usersQueryOptions = (page: number, limit: number) => queryOptions<PaginatedResponseModel<UserModel>>({
  queryKey: ["users", { page, limit }],
  queryFn: () => getUsers(page, limit)
});


// GET /user/$id
const getUser = async (id: number) =>
  await axiosInstance
    .get(`${baseUrl}/${id}`)
    .then((r) => {
      console.log("test", r);
      return userSchema.parse(r.data.data);
    });

export const userQueryOptions = (id: number) => queryOptions<UserModel>({
  queryKey: ["users", { id }],
  queryFn: () => getUser(id)
});


// PATCH /user/$id
export const useUpdateUserMutation = (userId: number) => useMutation({
  mutationKey: ["users", "update", userId],
  mutationFn: async (user: UserModel) =>
    await axiosInstance
      .patch(`${baseUrl} / ${user.id}`, user)
      .then(r => userSchema.parse(r.data))
});
