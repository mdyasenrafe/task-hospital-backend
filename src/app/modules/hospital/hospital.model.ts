import { Schema, model } from "mongoose";
import { THospital } from "./hospital.type";

const hospitalSchema = new Schema<THospital>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export const HospitalModel = model<THospital>("hospital", hospitalSchema);
