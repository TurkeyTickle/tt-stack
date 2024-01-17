import { z } from 'zod';
import { relationshipStatusEnum } from './enums/relationship-status.enum';

export const personSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  relationshipStatus: relationshipStatusEnum,
  dob: z.date().min(new Date(1900, 1, 1)).max(new Date()),
});

export type PersonModel = z.infer<typeof personSchema>;
