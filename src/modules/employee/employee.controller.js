import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import { employeeService } from "./employee.service.js";

const addEmployee = catchAsync(async (req, res) => {
  const employeeData = { ...req.body };
  if (req.file) {
    const fileName = req.file.filename;
    employeeData.photo = `/uploads/employee/${fileName}`;
  }
  const employee = await employeeService.addEmployee(employeeData);
  if (employee) {
    sendResponse(res, 200, "Employee added successfully", employee);
  } else {
    sendResponse(res, 400, "Failed to add employee", {});
  }
});

const getAllEmployees = catchAsync(async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  if (employees) {
    sendResponse(res, 200, true, "Employees Found", employees);
  } else {
    sendResponse(res, 404, false, "No employees found", {});
  }
});

const updatesEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const employeeData = { ...req.body };
  // console.log(employeeData);
  if (req.file) {
    const fileName = req.file.filename;
    employeeData.photo = `/uploads/employee/${fileName}`;
  }
  const employee = await employeeService.updateEmployee(id, employeeData);
  if (employee) {
    sendResponse(res, 200, true, "Employee updated successfully", employee);
  } else {
    sendResponse(res, 400, false, "Failed to update employee", {});
  }
});

const deleteEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const employee = await employeeService.deleteEmployee(id);
  if (employee) {
    sendResponse(res, 200, true, "Employee deleted successfully", employee);
  } else {
    sendResponse(res, 400, false, "Failed to delete employee", {});
  }
});

export const employeeController = {
  addEmployee,
  getAllEmployees,
  updatesEmployee,
  deleteEmployee,
};
