import { Schema, model, Types } from "mongoose";
const budgetSchema = new Schema(
  {
    category: {
      type: Types.ObjectId,
      ref: "budgetCategory",
      required: [true, "budget category is required"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user information is required"],
    },
    amountType: {
      type: String,
      enum: ["bhd", "usd"],
      required: [true, "amount type is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount  is required"],
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
    month: {
      type: String,
      required: [true, "month is required"],
    },
    progressPercentage: {
      type: Number,
      default: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
budgetSchema.virtual("progress").get(function () {
  return this.progressPercentage / 100;
});
const Budget = model("Budget", budgetSchema);
export default Budget;
