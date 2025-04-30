import { Types } from "mongoose";
import { THospital } from "./hospital.type";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { HospitalModel } from "./hospital.model";

const getHospitalsFromDB = async () => {
  const result = await HospitalModel.find({ status: "active" });
  return result;
};

const getHospitalFromDB = async (id: Types.ObjectId) => {
  const hospital = await HospitalModel.findById(id);

  if (!hospital) {
    throw new AppError(httpStatus.NOT_FOUND, "Hospital not found");
  }

  if (hospital.status === "inactive") {
    throw new AppError(httpStatus.BAD_REQUEST, "Hospital is deleted");
  }

  return hospital;
};

const createHospitalInDB = async (payload: THospital) => {
  const result = await HospitalModel.create(payload);
  return result;
};

const updateHospitalIntoDB = async (
  id: Types.ObjectId,
  payload: Partial<THospital>
) => {
  if ("_id" in payload) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "_id field cannot be updated. Please remove it from the request body."
    );
  }

  const hospital = await HospitalModel.findById(id);

  if (!hospital) {
    throw new AppError(httpStatus.NOT_FOUND, "Hospital not found");
  }

  if (hospital.status === "inactive") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cannot update a deleted hospital"
    );
  }

  const result = await HospitalModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteHospitalFromDB = async (id: Types.ObjectId) => {
  const hospital = await HospitalModel.findById(id);

  if (!hospital) {
    throw new AppError(httpStatus.NOT_FOUND, "Hospital not found");
  }

  if (hospital.status === "inactive") {
    throw new AppError(httpStatus.BAD_REQUEST, "Hospital is already deleted");
  }

  const result = await HospitalModel.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true }
  );

  return result;
};

export const HospitalServices = {
  getHospitalsFromDB,
  getHospitalFromDB,
  createHospitalInDB,
  updateHospitalIntoDB,
  deleteHospitalFromDB,
};
