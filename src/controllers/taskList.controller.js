import httpStatus from "http-status";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import TaskListServices from "../services/taskList.service.js";

const insertTaskListIntoDB = catchAsync(async (req, res) => {
  const category = req?.params?.id;

  const data = req?.body?.map((item) => ({
    category: category,
    title: item?.title,
  }));
  console.log(data);
  const result = await TaskListServices.insertTaskIntoDB(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task list inserted successfully",
    data: result,
  });
});
const getAllTaskList = catchAsync(async (req, res) => {
  const result = await TaskListServices.getAllTasks(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task lists retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const getSingleTask = catchAsync(async (req, res) => {
  const result = await TaskListServices.getSingleTask(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task list retrieved  successfully",
    data: result,
  });
});

const TaskListControllers = {
  insertTaskListIntoDB,
  getAllTaskList,
  getSingleTask,
};
export default TaskListControllers;
