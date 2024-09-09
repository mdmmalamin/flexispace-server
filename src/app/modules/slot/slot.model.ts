import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Slot = model<TSlot>('Slot', slotSchema);

// Slot Model
// room : Reference to the specific room being booked.
// date: Date of the booking.
// startTime: Start time of the slot.
// endTime: End time of the slot.
// isBooked: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).
