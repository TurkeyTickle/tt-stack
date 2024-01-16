import { z } from 'zod';

export const genderEnum = z.enum(['Male', "Female"]);