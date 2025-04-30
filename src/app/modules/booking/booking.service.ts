import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { BookingModel } from "./booking.model";
import { UserModel } from "../user/user.model";
import { HospitalModel } from "../hospital/hospital.model";
import { TBooking } from "./booking.type";

const createBooking = async (payload: TBooking) => {
  const user = await UserModel.findById(payload?.user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const hospital = await HospitalModel.findById(payload.hospital);
  if (!hospital) {
    throw new AppError(httpStatus.NOT_FOUND, "Hospital not found");
  }

  const booking = await BookingModel.create(payload);

  return booking;
};

const getAllBookingsByUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const bookings = await BookingModel.find({ user: userId })
    .populate("user")
    .populate("hospital")
    .sort({ appointmentDate: -1 });

  return bookings;
};

export const BookingServices = {
  createBooking,
  getAllBookingsByUser,
};
