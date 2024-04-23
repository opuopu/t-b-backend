import httpStatus from "http-status";

import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import budgetCategoryServices from "../services/budgetCategory.service.js";
import { createFileDetails } from "../utils/file.utils.js";

const insertBudgetCategoryIntoDb = catchAsync(async (req, res) => {
  if (req?.file) {
    req.body.icon = createFileDetails("icons", req?.file?.filename);
  }

  const result = await budgetCategoryServices.insertBudgetCategoryIntoDb(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget category created successfully",
    data: result,
  });
});
const getallFromDb = catchAsync(async (req, res) => {
  const result = await budgetCategoryServices.getallFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budgets  retrieved  successfully",
    data: result,
  });
});
const getSingleFromDb = catchAsync(async (req, res) => {
  const result = await budgetCategoryServices.getSingleFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budgets category  retrieved  successfully",
    data: result,
  });
});

const budgetCategoryControllers = {
  insertBudgetCategoryIntoDb,
  getallFromDb,
  getSingleFromDb,
};
export default budgetCategoryControllers;
