import { Schema, model } from 'mongoose';

const bookingSchema = new Schema<TBooking>(
  {},
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
