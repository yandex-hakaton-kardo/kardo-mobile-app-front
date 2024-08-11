import * as z from 'zod';

export const competitionRequestSchema1 = z.object({
  role: z.string(),
  type: z.string(),
  direction: z.string(),
  country: z.string(),
  region: z.string(),
  city: z.string(),
});

export const competitionRequestSchema2 = z.object({
  secondName: z.string(),
  firstName: z.string(),
  thirdName: z.string(),
  email: z.string().email().min(5).max(50),
  phone: z.string(),
  birthDate: z.string(),
  gender: z.string(),
});

export const competitionRequestSchema3 = z.object({
  file: z.string(),
  socialLink: z.string().url(),
  about: z.string(),
});
