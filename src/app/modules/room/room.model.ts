import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    roomNo: {
      type: Number,
      required: [true, 'Room no. is required'],
      // unique: true,
    },
    floorNo: {
      type: Number,
      required: [true, 'Floor no. is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
    },
    pricePerSlot: {
      type: Number,
      required: [true, 'Price per slot is required'],
    },
    amenities: {
      type: [String],
      trim: true,
      default: [],
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

// Set up the toJSON transform to remove unwanted fields
roomSchema.set('toJSON', {
  transform: (doc, remove) => {
    delete remove.createdAt;
    delete remove.updatedAt;
    delete remove.__v;
    return remove;
  },
});

export const Room = model<TRoom>('Room', roomSchema);

// Room Model:
// name: The name of the meeting room.
// roomNo : The unique number of the room.
// floorNo : The level of the meeting room where it is located.
// capacity: The maximum number of people the room can accommodate.
// pricePerSlot: The individual cost of a single slot.
// amenities: An array of amenities available in the room (e.g., "Projector", "Whiteboard"). Don't use enum.
// isDeleted: Boolean to indicates whether the room has been marked as deleted (false means it is not deleted).
