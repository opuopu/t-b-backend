import httpStatus from "http-status";
import Tagservices from "../services/tags.service.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const insertTagIntoDB = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const result = await Tagservices.insertTagIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag created successfully.",
    data: result,
  });
});

const getAllTagsByQuery = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await Tagservices.getAllTagsByQuery(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tags retrieved successfully.",
    data: result,
  });
});
const getsingleTag = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await Tagservices.getAllTagsByQuery(req.params.id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag retrieved successfully.",
    data: result,
  });
});
const updateTags = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await Tagservices.updateTags(req.params.id, userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag updated successfully.",
    data: result,
  });
});
const deleteTag = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await Tagservices.deleteTag(req.params.id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tag deleted successfully.",
    data: result,
  });
});

const TagsControllers = {
  insertTagIntoDB,
  getAllTagsByQuery,
  getsingleTag,
  updateTags,
  deleteTag,
};
export default TagsControllers;
