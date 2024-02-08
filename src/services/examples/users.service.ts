import { axiosInstance } from "@/axios-instance";
import {
  PaginatedResponseModel,
  paginatedResponseSchema,
} from "@/models/examples/paged-result.model";
import { UserModel, userSchema } from "@/models/examples/user.model";
import { queryOptions, useMutation } from "@tanstack/react-query";

const baseUrl = `${import.meta.env.VITE_EXAMPLE_API_URL}/users`;

// GET /users
export const usersQueryOptions = (page: number, limit: number) =>
  queryOptions<PaginatedResponseModel<UserModel>>({
    queryKey: ["users", { page, limit }],
    queryFn: async () => axiosInstance.get(`${baseUrl}?page=${page}&per_page=${limit}`).then((r) => paginatedResponseSchema(userSchema).parse(r.data))
  });

// GET /users/$id
export const userQueryOptions = (id: number) =>
  queryOptions<UserModel>({
    queryKey: ["users", { id }],
    queryFn: async () => axiosInstance.get(`${baseUrl}/${id}`).then((r) => userSchema.parse(r.data.data))
  });

// PATCH /users/$id
export const useUpdateUserMutation = (userId: number) =>
  useMutation({
    mutationKey: ["users", "update", userId],
    mutationFn: async (user: UserModel) => await axiosInstance.patch(`${baseUrl}/${user.id}`, user).then((r) => userSchema.parse(r.data)),
  });
