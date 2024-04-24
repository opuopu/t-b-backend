import httpStatus from "http-status";
import TaskCategoryServices from "../services/taskCategory.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const insertTaskCategoryIntoDB = catchAsync(async (req, res) => {
  const result = await TaskCategoryServices.insertTaskCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task category created  successfully.",
    data: result,
  });
});
const getAllTaskCategoires = catchAsync(async (req, res) => {
  const result = await TaskCategoryServices.getAllTaskCategoires();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task categories retrieved successfully.",
    data: result,
  });
});
const getsingleTaskCategory = catchAsync(async (req, res) => {
  const result = await TaskCategoryServices.getsingleTaskCategory(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task category retrieved successfully.",
    data: result,
  });
});
const TaskCategoryControllers = {
  insertTaskCategoryIntoDB,
  getAllTaskCategoires,
  getsingleTaskCategory,
};
export default TaskCategoryControllers;
