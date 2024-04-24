import httpStatus from "http-status";
import UserServices from "../services/user.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { createFileDetails } from "../utils/file.utils.js";

const getme = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserServices.getme(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const updateMyProfile = catchAsync(async (req, res) => {
  const { userId, role, email } = req.user || {};
  if (req?.file) {
    req.body.image = createFileDetails("profile", req?.file?.filename);
  }
  const result = await UserServices.updateMyProfile(
    email,
    userId,
    role,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const UserControllers = {
  getme,
  updateMyProfile,
};
export default UserControllers;
