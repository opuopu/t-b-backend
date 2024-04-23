import httpStatus from "http-status";
import UserServices from "../services/User.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { createFileDetails } from "../utils/file.utils.js";

const getme = catchAsync(async (req, res) => {
  const { UserId, role } = req.User;
  const result = await UserServices.getme(UserId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved  successfully",
    data: result,
  });
});
const updateMyProfile = catchAsync(async (req, res) => {
  const { UserId, role, email } = req.User;
  if (req?.file) {
    req.body.image = createFileDetails("profile", req?.file?.filename);
  }
  const result = await UserServices.updateMyProfile(
    email,
    UserId,
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
