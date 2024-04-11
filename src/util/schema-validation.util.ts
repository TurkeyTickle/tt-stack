import { notifications } from "@mantine/notifications";
import type { z } from "zod";

export const validateBySchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
) => {
  const parseResult = schema.safeParse(data);

  if (parseResult.success) {
    return parseResult.data as z.infer<T>;
  }

  if (import.meta.env.DEV) {
    notifications.show({
      title: "Schema Parse Error (see console for details)",
      message: parseResult.error.message,
    });
  }

  console.error(parseResult.error);

  throw parseResult.error;
};
