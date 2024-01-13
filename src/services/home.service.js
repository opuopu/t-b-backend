import httpStatus from "http-status";
import QueryBuilder from "../builder/QueryBuilder.js";
import AppError from "../errors/AppError.js";
import Home from "../models/home.model.js";
import mongoose from "mongoose";
import Room from "../models/room.model.js";
const inserHomeIntoDB = async (payload) => {
  const { rooms, ...others } = payload;
  console.log(others);
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const createHome = await Home.create([{ ...others }], { session });
    if (!createHome) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "something went wrong. homes not created!"
      );
    }
    const roomsWithHomeId = rooms.map((room) => ({
      title: room?.title,
      home: createHome[0]._id,
      user: others?.user,
    }));
    const createRooms = await Room.create(roomsWithHomeId, {
      session,
    });
    if (!createRooms) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went wrong. Rooms not created!"
      );
    }
    await session.commitTransaction();
    await session.commitTransaction();
    await session.endSession();
    return createRooms;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const getAllHomes = async (query) => {
  const homequery = new QueryBuilder(Home.find().populate("user"), query)
    .search()
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await homequery.modelQuery;
  const meta = await homequery.meta();
  return {
    meta,
    result,
  };
};

const getSingleHome = async (id) => {
  const result = await Home.findOne({ _id: id }).populate("user");
  return result;
};
const updateHome = async (id, payload) => {
  const result = await Home.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("user");
  return result;
};
const deleteHome = async (id) => {
  const result = await Home.findByIdAndDelete(id);
  return result;
};

const homeServices = {
  inserHomeIntoDB,
  getAllHomes,
  getSingleHome,
  updateHome,
  deleteHome,
};

export default homeServices;
