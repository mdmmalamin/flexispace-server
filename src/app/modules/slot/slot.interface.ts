import { Types } from 'mongoose';

export type TSlot = {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  // slotDuration?: number;
  isBooked: boolean;
};
