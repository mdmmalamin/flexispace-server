import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address')
      .trim(),
    password: z.string({ required_error: 'Password is required' }),
    phone: z.string({ required_error: 'Phone no is required' }).trim(),
    address: z.string().trim().optional(),
    role: z.enum(['admin', 'user']),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginValidationSchema,
};
