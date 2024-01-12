import { Schema, Types, model } from "mongoose";

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "expense name is required"],
    },
    period: {
      type: String,
      enum: ["Week", "Month", "Year", "One Time"],
      trim: true,
      required: [true, "expense period is required"],
    },
    category: {
      type: Types.ObjectId,
      ref: "budgetCategory",
      //   required: [true, "budget category is required"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user information is required"],
    },
    amountType: {
      type: String,
      required: [true, "amount type is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount  is required"],
    },
    budget: {
      type: Types.ObjectId,
      ref: "Budget",
      required: [true, "budget is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);
export default Expense;
