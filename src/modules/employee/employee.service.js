import mongoose from "mongoose";
import moment from "moment";
import Employee from "./employee.model.js";

const addEmployee = async (employeeBody) => {
  const employee = new Employee(employeeBody);
  const saveEmployee = await employee.save();
  return saveEmployee;
};

const getAllEmployees = async () => {
  const employees = await Employee.find({ isDelete: "no" });
  return employees;
};

const getSingleEmployee = async (employeeId) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId);
  if (!isValidObjectId) {
    return null;
  }

  const employee = await Employee.findById(employeeId);
  return employee;
};

const updateEmployee = async (employeeId, employeeBody) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId);
  if (!isValidObjectId) {
    return null;
  }

  const employee = await Employee.findByIdAndUpdate(employeeId, employeeBody, {
    new: true,
  });
  return employee;
};

const deleteEmployee = async (employeeId) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(employeeId);
  if (!isValidObjectId) {
    return null;
  }

  const employee = await Employee.findOneAndUpdate(
    { _id: employeeId },
    { isDelete: "yes" },
    { new: true }
  );
  // const employee = await Employee.findByIdAndDelete(employeeId);
  return employee;
};

export const employeeService = {
  addEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
