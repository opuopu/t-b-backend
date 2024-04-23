import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import RoomServices from "../services/Room.service.js";
const inserRoomIntoDB = catchAsync(async (req, res) => {
  const { userId, id } = req?.user;
  req.body.user = userId;
  req.body.id = id;
  const result = await RoomServices.inserRoomIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room created successfully",
    data: result,
  });
});
const insertSingleRoomIntoDb = catchAsync(async (req, res) => {
  const { userId } = req?.user;
  console.log(req.body);
  req.body.user = userId;
  const result = await RoomServices.insertSingleRoomIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room created successfully",
    data: result,
  });
});
const getRoomsByQuery = catchAsync(async (req, res) => {
  const result = await RoomServices.getRoomsByQuery(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully.",
    data: result?.result,
    meta: result?.meta,
  });
});
const getSingleRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.getSingleRoom(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room retrieved successfully.",
    data: result,
  });
});
const updateRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.updateRoom(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room updated successfully.",
    data: result,
  });
});
const deleteRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.deleteRoom(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully.",
    data: result,
  });
});

const RoomControllers = {
  inserRoomIntoDB,
  insertSingleRoomIntoDb,
  getRoomsByQuery,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};

export default RoomControllers;
