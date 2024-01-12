import QueryBuilder from "../builder/QueryBuilder.js";
import Expense from "../models/expense.model.js";
const postExpenseIntoDB = async (payload) => {
  const result = await Expense.create(payload);
  return result;
};
const getAllExpenseByQuery = async (query) => {
  const expenseModel = new QueryBuilder(Expense.find(), query)
    .search()
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await expenseModel.modelQuery;
  const meta = await expenseModel.meta();
  return {
    meta,
    result,
  };
};
const getSingleExpense = async (id) => {
  const result = await Expense.findById(id);
  return result;
};
const updateExpense = async (id, payload) => {
  const result = await Expense.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteExpense = async (id) => {
  const result = await Expense.findByIdAndDelete(id);
  return result;
};
const expenseServices = {
  postExpenseIntoDB,
  getAllExpenseByQuery,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
export default expenseServices;
