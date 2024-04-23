import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import TaskScheduleService from "../services/workSchedule.service.js";
const insertUserTaskIntoDB = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.homeOwner = userId;
  const result = await TaskScheduleService.insertUserTaskIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task assigned successfully",
    data: result,
  });
});
const insertBreakTimeIntoDb = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.homeOwner = userId;
  const result = await TaskScheduleService.insertBreakTimeIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Break time added successfully",
    data: result,
  });
});
const getallWorkSchedules = catchAsync(async (req, res) => {
  const result = await TaskScheduleService.getAllWorkSchedule(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work schedules retrieved successfully",
    data: result,
  });
});
const getAllWorkScheduleByRoom = catchAsync(async (req, res) => {
  const result = await TaskScheduleService.getAllWorkScheduleByRoom(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work schedules retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const getSingleWorkSchedule = catchAsync(async (req, res) => {
  const result = await TaskScheduleService.getsingleWorkSchedule(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work schedules retrieved  successfully",
    data: result,
  });
});
const updateSchedule = catchAsync(async (req, res) => {
  const result = await TaskScheduleService.updateSchedule(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work schedule updated successfully",
    data: result,
  });
});
const deleteSingleSchedule = catchAsync(async (req, res) => {
  const result = await TaskScheduleService.deleteSingleSchedule(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Work schedule deleted successfully",
    data: result,
  });
});

const TaskScheduleController = {
  insertUserTaskIntoDB,
  insertBreakTimeIntoDb,
  getallWorkSchedules,
  getSingleWorkSchedule,
  updateSchedule,
  deleteSingleSchedule,
  getAllWorkScheduleByRoom,
};
export default TaskScheduleController;
