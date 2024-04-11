import { kyInstance } from "@/ky-instance";
import {
  paginatedResponseSchema,
  type PaginatedResponseModel,
} from "@/models/examples/paged-result.model";
import { userSchema, type UserModel } from "@/models/examples/user.model";
import { validateBySchema } from "@/util/schema-validation.util";
import { queryOptions, useMutation } from "@tanstack/react-query";

const baseUrl = `${import.meta.env.VITE_EXAMPLE_API_URL}/users`;

// GET /users
export const usersQueryOptions = (page: number, limit: number) =>
  queryOptions<PaginatedResponseModel<UserModel>>({
    queryKey: ["users", { page, limit }],
    queryFn: () =>
      kyInstance
        .get(baseUrl, {
          searchParams: {
            page,
            per_page: limit,
          },
        })
        .json()
        .then((json) =>
          validateBySchema(paginatedResponseSchema(userSchema), json),
        ),
  });

// GET /users/$id
export const userQueryOptions = (id: number) =>
  queryOptions<UserModel>({
    queryKey: ["users", { id }],
    queryFn: () =>
      kyInstance
        .get(`${baseUrl}/${id}`)
        .json()
        .then((json) => {
          // biome-ignore lint/suspicious/noExplicitAny: We don't care about the data envelope
          return validateBySchema(userSchema, (json as any).data);
        }),
  });

// PATCH /users/$id
export const useUpdateUserMutation = (userId: number) =>
  useMutation({
    mutationKey: ["users", "update", userId],
    mutationFn: (user: UserModel) =>
      kyInstance
        .patch(`${baseUrl}/${user.id}`, { json: user })
        .json()
        .then((json) => validateBySchema(userSchema, json)),
  });
