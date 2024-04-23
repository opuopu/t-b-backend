import httpStatus from "http-status";
import notificationServices from "../services/notification.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const getUserSpecificNotifications = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  req.query.receiver = userId;
  const result = await notificationServices.getUserSpecificNotifications(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Notifications retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const deleteNotification = catchAsync(async (req, res) => {
  const result = await notificationServices.deleteNotification(req?.parmas?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Notification deleted successfully",
    data: result,
  });
});

const notificationControllers = {
  getUserSpecificNotifications,
  deleteNotification,
};
export default notificationControllers;
