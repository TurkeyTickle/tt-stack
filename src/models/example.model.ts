import { z } from 'zod';

export const relationshipStatusEnum = z.enum(['Single', "Married", "Divorced", "Widowed"]);

export const exampleSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  relationshipStatus: relationshipStatusEnum,
  dob: z.date().min(new Date(1900, 1, 1)).max(new Date()),
});

export type ExampleModel = z.infer<typeof exampleSchema>;

