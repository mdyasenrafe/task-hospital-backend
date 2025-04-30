import express from "express";
import { UserRolesObject } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authenticateToken(UserRolesObject.user),
  validateRequest(BookingValidations.bookingSchema),
  BookingControllers.createBooking
);

router.get(
  "/",
  authenticateToken(UserRolesObject.user),
  BookingControllers.getUserBookings
);

export const BookingRoutes = router;
