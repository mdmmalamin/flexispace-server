import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    roomNo: z
      .number({ required_error: 'Room no is required' })
      .nonnegative('Room no. must be a non-negative number')
      .int(),
    floorNo: z
      .number({ required_error: 'Floor no. is required' })
      .nonnegative('Floor no. must be a non-negative number')
      .int(),
    capacity: z
      .number({ required_error: 'Capacity is required' })
      .nonnegative('Capacity must be a non-negative number')
      .int(),
    pricePerSlot: z
      .number({ required_error: 'Price per slot is required' })
      .nonnegative('Price per slot must be a non-negative number'),
    amenities: z.array(z.string().trim()).optional().default([]),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    roomNo: z
      .number()
      .nonnegative('Room no. must be a non-negative number')
      .int()
      .optional(),
    floorNo: z
      .number()
      .nonnegative('Floor no. must be a non-negative number')
      .int()
      .optional(),
    capacity: z
      .number()
      .nonnegative('Capacity must be a non-negative number')
      .int()
      .optional(),
    pricePerSlot: z
      .number()
      .nonnegative('Price per slot must be a non-negative number')
      .optional(),
    amenities: z.array(z.string().trim()).optional().default([]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const RoomValidation = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
