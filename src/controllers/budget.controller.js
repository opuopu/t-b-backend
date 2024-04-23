import httpStatus from "http-status";
import budgetCategoryServices from "../services/budgetCategory.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import budgetServices from "../services/budget.service.js";
import dayjs from "dayjs";

const insertBudgetIntoDB = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.remainingAmount = req.body.amount;
  req.body.user = userId;
  req.body.month = dayjs(req?.body?.month).format("YYYY-MM");
  const result = await budgetServices.insertBudgetIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget added successfully",
    data: result,
  });
});
const getbudgetsByQuery = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.query.user = userId;
  req.query.month = dayjs(new Date()).format("YYYY-MM");
  const result = await budgetServices.getbudgetsByQuery(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budgets retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const getsingleBudget = catchAsync(async (req, res) => {
  const result = await budgetServices.getSingleBudget(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget retrieved  successfully",
    data: result,
  });
});

const updateBudget = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await budgetServices.updateBudget(
    req.params.id,
    userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget updated successfully",
    data: result,
  });
});
const deleteBudget = catchAsync(async (req, res) => {
  const result = await budgetServices.deleteBudget(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget deleted successfully",
    data: result,
  });
});
const budgetVsExpense = catchAsync(async (req, res) => {
  req.query.user = req?.user?.userId;
  const result = await budgetServices.budgetVsexpense(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Budget vs Expense retrieved  successfully",
    data: result,
  });
});
const budgetControllers = {
  insertBudgetIntoDB,
  getbudgetsByQuery,
  getsingleBudget,
  updateBudget,
  deleteBudget,
  budgetVsExpense,
};
export default budgetControllers;
