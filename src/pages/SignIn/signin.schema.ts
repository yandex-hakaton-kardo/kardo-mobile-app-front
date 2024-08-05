import * as z from 'zod';

export interface SignInData {
  username: string;
  password: string;
}

export const signinSchema = z.object({
  username: z.string().regex(/^\w{2,30}$/i),
  password: z
    .string()
    .min(6)
    .max(15)
    .regex(/\d/)
    .regex(/\p{Lu}/u) // has uppercase letter
    .regex(/\p{Ll}/u) // has lowercase letter
    .regex(/[!@#$%^&*()\-_+=;:'",.<>/?|`~[\]{}]/) // has special char
    .regex(/^[^\p{Letter}--[a-z]]*$/iv), // only latin letters
});
