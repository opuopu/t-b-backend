import httpStatus from "http-status";
import expenseServices from "../services/expense.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const insertExpenseIntoDB = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  req.body.user = userId;
  const result = await expenseServices.postExpenseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "expense Created successfully",
    data: result,
  });
});
const getAllExpenseByQuery = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  req.query.user = userId;
  const result = await expenseServices.getAllExpenseByQuery(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "expenses retrived successfully",
    data: result,
  });
});
const getBudgetAndExpenseOverview = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  req.query.user = userId;
  const result = await expenseServices.getBudgetAndExpenseOverview(userId);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "budget and expenses overview retrived successfully",
    data: result,
  });
});
const getSingleExpense = catchAsync(async (req, res) => {
  const result = await expenseServices.getSingleExpense(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "expense retrived successfully",
    data: result,
  });
});
const updateExpense = catchAsync(async (req, res) => {
  const result = await expenseServices.updateExpense(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "expense updated successfully",
    data: result,
  });
});
const deleteExpense = catchAsync(async (req, res) => {
  const result = await expenseServices.deleteExpense(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "expense deleted successfully",
    data: result,
  });
});

const expenseControllers = {
  getBudgetAndExpenseOverview,
  insertExpenseIntoDB,
  getAllExpenseByQuery,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
export default expenseControllers;
