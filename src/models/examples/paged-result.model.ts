import { ZodType, z } from "zod";

export const paginatedResponseSchema = <TItem extends ZodType>(itemSchema: TItem) => {
  return z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(itemSchema)
  });
}

type PaginatedResponseType<TItem extends ZodType> = ReturnType<typeof paginatedResponseSchema<TItem>>

export type PaginatedResponseModel<TItem> = z.infer<PaginatedResponseType<ZodType<TItem>>>
