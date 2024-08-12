import * as z from 'zod';

export const competitionRequestSchema1 = z
  .object({
    role: z.string(),
    type: z.string(),
    direction: z.string(),
    country: z.string(),
    region: z.string().optional(),
    city: z.string(),
  })
  .refine(
    data => {
      if (data.country === '1') {
        return data.region !== undefined && data.region !== '';
      }
      return true;
    },
    {
      message: 'Поле region обязательно для заполнения, для России',
      path: ['region'],
    },
  );

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
  file: z.string().url(),
  socialLink: z.string().url(),
  about: z.string(),
});
