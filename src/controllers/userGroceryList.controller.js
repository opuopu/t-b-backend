import httpStatus from "http-status";
import userGroceryListServices from "../services/userGroceryLists.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const insertUserGroceryListsIntoDB = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  if (role === "homeowner") {
    req.body.homeOwner = userId;
  } else if (role === "employee") {
    req.body.employee = userId;
  }
  if (req?.user?.homeOwnerId) {
    req.body.homeOwner = req?.user?.homeOwnerId;
  }

  const result = await userGroceryListServices.insertUserGroceryListsIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user grocery lists inserted successfully",
    data: result,
  });
});
const getgroceryListByEmployee = catchAsync(async (req, res) => {
  const { employeeId } = req.user || {};
  req.query.employee = employeeId;
  console.log("hitted");
  const result = await userGroceryListServices.getgroceryListByEmployee(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "grocery Lists retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const getuserSingleGroceryList = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.query.homeOwner = userId;
  const result = await userGroceryListServices.getuserSingleGroceryList(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "grocery List retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});
const findGroceryFromGroceryLists = catchAsync(async (req, res) => {
  const { userId } = req?.user || {};
  req.query.homeOwner = userId;
  const result = await userGroceryListServices.findGroceryFromGroceryLists(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "grocery Lists retrieved  successfully",
    data: result?.result,
    meta: result?.meta,
  });
});

const updateUserGroceryList = catchAsync(async (req, res) => {
  const { role, userId } = req.user;
  if (role === "employee") {
    req.body.employee = userId;
  }
  const result = await userGroceryListServices.updateUserGroceryList(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grocery list updated successfully",
    data: result,
  });
});
const deleteGroceryFromList = catchAsync(async (req, res) => {
  const result = await userGroceryListServices.deleteGroceryFromList(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Grocery list deleted successfully",
    data: result,
  });
});
const markAsBusy = catchAsync(async (req, res) => {
  const { homeOwnerId } = req?.user || {};
  if (homeOwnerId) {
    req.body.homeOwner = homeOwnerId;
  }
  const result = await userGroceryListServices.markAsBusy(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "The grocery list has been successfully marked as busy.",
    data: result,
  });
});
const markAsComplete = catchAsync(async (req, res) => {
  const { homeOwnerId } = req?.user || {};
  if (homeOwnerId) {
    req.body.homeOwner = homeOwnerId;
  }
  const result = await userGroceryListServices.markAsComplete(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task successfully marked as complete.",
    data: result,
  });
});
const sendBuyRequest = catchAsync(async (req, res) => {
  const { homeOwnerId, employeeId } = req?.user || {};
  req.body.homeOwner = homeOwnerId;
  req.body.employee = employeeId;
  const result = await userGroceryListServices.sendBuyRequest(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request sent successfully",
    data: result,
  });
});
const acceptBuyRequest = catchAsync(async (req, res) => {
  const result = await userGroceryListServices.AcceptBuyRequest(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request approved successfully",
    data: result,
  });
});
const DeclineRequest = catchAsync(async (req, res) => {
  const result = await userGroceryListServices.declineBuyRequest(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request declined successfully",
    data: result,
  });
});
const userGroceryListControllers = {
  insertUserGroceryListsIntoDB,
  findGroceryFromGroceryLists,
  getgroceryListByEmployee,
  getuserSingleGroceryList,
  updateUserGroceryList,
  deleteGroceryFromList,
  markAsBusy,
  markAsComplete,
  sendBuyRequest,
  acceptBuyRequest,
  DeclineRequest,
};
export default userGroceryListControllers;
