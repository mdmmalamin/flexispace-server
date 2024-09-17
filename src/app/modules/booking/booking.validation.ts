import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    room: z.string({ required_error: 'Room id is required' }),
    slots: z.array(z.string({ required_error: 'Slot id is required' })).nonempty(),
    user: z.string({ required_error: 'User id is required!' }),
    date: z.string({ required_error: 'Date is required!' }),
    totalAmount: z
      .number({ required_error: 'Total amount is required!' })
      .optional(),
    isConfirmed: z
      .enum(['confirmed', 'unconfirmed', 'canceled'])
      .optional()
      .default('unconfirmed'),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    isConfirmed: z
      .enum(['confirmed', 'unconfirmed', 'canceled'])
      .optional()
      .default('unconfirmed'),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
