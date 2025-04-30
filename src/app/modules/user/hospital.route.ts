import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserRolesObject } from "../user/user.constant";
import { HospitalValidations } from "../hospital/hospital.validation";
import { HospitalControllers } from "../hospital/hospital.controller";

const router = express.Router();

router.post(
  "/",

  validateRequest(HospitalValidations.hospitalCreateSchema),
  HospitalControllers.createHospital
);

router.get(
  "/",
  authenticateToken(UserRolesObject.admin, UserRolesObject.user),
  HospitalControllers.getHospitals
);

router.get(
  "/:id",
  authenticateToken(UserRolesObject.admin, UserRolesObject.user),
  HospitalControllers.getHospital
);

router.patch(
  "/:id",
  authenticateToken(UserRolesObject.admin, UserRolesObject.user),

  validateRequest(HospitalValidations.hospitalUpdateSchema),
  HospitalControllers.updateHospital
);

router.delete(
  "/:id",
  authenticateToken(UserRolesObject.admin, UserRolesObject.user),
  HospitalControllers.deleteHospital
);

export const HospitalRoutes = router;
