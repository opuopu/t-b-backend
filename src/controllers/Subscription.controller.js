import httpStatus from "http-status";
import subscriptionServices from "../services/subscription.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const createPaymentIntent = catchAsync(async (req, res) => {
  const result = await subscriptionServices.createPaymentIntent();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "client secret retrieved  successfully",
    data: result,
  });
});
const BuySubscription = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  const result = await subscriptionServices.BuySubscription(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      "Congratulations! You've successfully purchased a subscription plan.",
    data: result,
  });
});
const getMyPlan = catchAsync(async (req, res) => {
  const result = await subscriptionServices.getMyPlan(req?.user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your plan retrieved successfully",
    data: result,
  });
});
const subscriptionControllers = {
  createPaymentIntent,
  BuySubscription,
  getMyPlan,
};
export default subscriptionControllers;
