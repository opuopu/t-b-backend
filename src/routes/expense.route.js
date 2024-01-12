import express from "express";
import auth from "../middlewares/auth.js";
import { USER_ROLE } from "../constant/user.role.js";
import expenseControllers from "../controllers/expense.controller.js";
const router = express.Router();
router.post(
  "/",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.insertExpenseIntoDB
);
router.get(
  "/overview",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.getBudgetAndExpenseOverview
);
router.get(
  "/",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.getAllExpenseByQuery
);
router.get(
  "/:id",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.getSingleExpense
);
router.patch(
  "/:id",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.updateExpense
);
router.delete(
  "/:id",
  auth(USER_ROLE.HOMEOWNER),
  expenseControllers.deleteExpense
);
const expenseRoutes = router;
export default expenseRoutes;
