import * as z from 'zod';

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export const signupSchema = z.object({
  username: z.string().regex(/^\w{2,30}$/i),
  email: z.string().email().min(5).max(50),
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
