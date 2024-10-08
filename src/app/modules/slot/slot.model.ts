import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room is required!'],
    },
    date: {
      type: String,
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
    // slotDuration: {
    //   type: Number,
    //   default: 60,
    // },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

slotSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Slot = model<TSlot>('Slot', slotSchema);

// Slot Model
// room : Reference to the specific room being booked.
// date: Date of the booking.
// startTime: Start time of the slot.
// endTime: End time of the slot.
// isBooked: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).
