import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HospitalRoutes } from "../modules/user/hospital.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/hospital",
    route: HospitalRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
