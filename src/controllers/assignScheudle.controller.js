import httpStatus from "http-status";
import AssignScheduleServices from "../services/assignSchedule.service.js";
import sendResponse from "../utils/sendResponse.js";
import catchAsync from "../utils/catchAsync.js";
const insertScheduleIntoDb = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.homeOwner = userId;
  const result = await AssignScheduleServices.insertScheduleIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Added successfully",
    data: result,
  });
});
const getAllSchedules = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getAllAssignSchedule(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "assign schedule retrived successfully",
    data: result,
  });
});
const getAssignedScheduleById = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getAssignedSchedule(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "assign schedule retrived successfully",
    data: result,
  });
});
const updateAssignSchedule = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.updateAssignSchedule(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "assign schedule updated successfully",
    data: result,
  });
});

const getDataFromSundayToThursday = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getDataFromSundayToThursday(
    req?.user?.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "data retrived successfully",
    data: result,
  });
});
const getSaturdayData = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getSaturdayData(
    req?.user?.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "saturday data retrived successfully",
    data: result,
  });
});
const getFridayData = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getFridayData(req?.user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "friday data retrived successfully",
    data: result,
  });
});
const getWeekendData = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getWeekendData(req?.user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "weekend data retrived successfully",
    data: result,
  });
});
const employeeWorkDetailsByScheduleId = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.employeeWorkDetailsByScheduleId(
    req.params.scheduleId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "employee schedule data retrived successfully",
    data: result,
  });
});
const getScheduleDataByEmployee = catchAsync(async (req, res) => {
  const result = await AssignScheduleServices.getScheduleDataByEmployee(
    req?.user?.employeeId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "employee schedule data retrived successfully",
    data: result,
  });
});
const AssignScheduleControllers = {
  insertScheduleIntoDb,
  getAssignedScheduleById,
  updateAssignSchedule,
  getAllSchedules,
  getDataFromSundayToThursday,
  getWeekendData,
  getSaturdayData,
  getFridayData,
  employeeWorkDetailsByScheduleId,
  getScheduleDataByEmployee,
};
export default AssignScheduleControllers;
