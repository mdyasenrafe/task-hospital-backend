import { Request } from "express";
import { Types } from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { HospitalServices } from "./hospital.service";
import { THospital } from "./hospital.type";

const createHospital = catchAsync(async (req, res) => {
  const payload: THospital = req.body;
  const result = await HospitalServices.createHospitalInDB(payload);

  sendResponse(res, {
    message: "Hospital created successfully",
    data: result,
  });
});

const getHospital = catchAsync(async (req: Request, res) => {
  const id = req.params.id;
  const result = await HospitalServices.getHospitalFromDB(
    new Types.ObjectId(id)
  );

  sendResponse(res, {
    message: "Hospital retrieved successfully",
    data: result,
  });
});

const getHospitals = catchAsync(async (req: Request, res) => {
  const id = req.params.id;
  const result = await HospitalServices.getHospitalsFromDB();

  sendResponse(res, {
    message: "Hospitals retrieved successfully",
    data: result,
  });
});

// Update Hospital by ID
const updateHospital = catchAsync(async (req: Request, res) => {
  const id = req.params.id;
  const payload: Partial<THospital> = req.body;

  const result = await HospitalServices.updateHospitalIntoDB(
    new Types.ObjectId(id),
    payload
  );

  sendResponse(res, {
    message: "Hospital updated successfully",
    data: result,
  });
});

// Soft Delete Hospital by ID
const deleteHospital = catchAsync(async (req: Request, res) => {
  const id = req.params.id;
  const result = await HospitalServices.deleteHospitalFromDB(
    new Types.ObjectId(id)
  );

  sendResponse(res, {
    message: "Hospital deleted (soft) successfully",
    data: result,
  });
});

export const HospitalControllers = {
  createHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  getHospitals,
};
