import { z } from 'zod';

export const relationshipStatusEnum = z.enum(['Single', "Married", "Divorced", "Widowed"]);
