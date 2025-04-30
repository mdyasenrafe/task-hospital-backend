import { Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface TBooking {
  user: Types.ObjectId;
  hospital: Types.ObjectId;
  service: string;
  appointmentDate: Date;
  status?: BookingStatus;
  createdAt?: Date;
}
