import { Schema, model, Document } from "mongoose";
import { TBooking } from "./booking.type";

const bookingSchema = new Schema<TBooking>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
  service: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const BookingModel = model<TBooking>("booking", bookingSchema);
