import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const payload = { ...req.body, user: userId };
  const result = await BookingServices.createBooking(payload);

  sendResponse(res, {
    message: "Booking created successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await BookingServices.getAllBookingsByUser(userId);

  sendResponse(res, {
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getUserBookings,
};
