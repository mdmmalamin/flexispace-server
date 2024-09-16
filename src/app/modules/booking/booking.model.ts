import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    isConfirmed: {
      type: String,
      enum: {
        values: ['confirmed', 'unconfirmed', 'canceled'],
        message: `{VALUE} is not a valid booking status!`,
      },
      default: 'unconfirmed',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.set('toJSON', {
  transform: (doc, remove) => {
    delete remove.createdAt;
    delete remove.updatedAt;
    delete remove.__v;
    return remove;
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
