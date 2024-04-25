import { User } from "../models/user.model.js";
import AppError from "../errors/AppError.js";
import httpStatus from "http-status";
import otpServices from "./otp.service.js";
import mongoose from "mongoose";
import { createToken, verifyToken } from "../utils/auth.utils.js";
import config from "../config/index.js";
import Otp from "../models/Otp.model.js";
import bcrypt from "bcrypt";

import { generateNewEmployeeId } from "../utils/employee.utils.js";
import HomeOwner from "../models/homeOwner.model.js";
import sendEmail from "../utils/sendEmail.js";
import Employee from "../models/employee.model.js";
import { dateCompare } from "../utils/date.utils.js";
// create homeOwner
const signupHomeOwnerIntoDB = async (payload) => {
  const { email } = payload;
  const user = await User.isUserExist(email);
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exist with the same email."
    );
  }
  if (payload?.password !== payload.confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password and Confirm password do not match."
    );
  }
  await otpServices.createAnOtpIntoDB({
    email,
    type: "signupVerification",
  });
};
// signup employee
const signupEmployeeIntoDb = async (payload) => {
  const { email, password, phoneNumber, needPasswordChange, ...others } =
    payload;
  const id = await generateNewEmployeeId();
  const authObj = {
    email,
    password,
    phoneNumber,
    needPasswordChange: true,
    role: "employee",
    verified: true,
    id: id,
  };
  const user = await User.isUserExist(email);
  if (user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User already exist with the same email!"
    );
  }
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    result = await User.create([authObj], { session });
    if (!result[0]) {
      throw new AppError(httpStatus.BAD_REQUEST, "Somethign went wrong");
    }
    const userId = result[0]?._id;

    const insertEmployeeDetails = await Employee.create(
      [
        {
          ...others,
          user: userId,
          id: id,
        },
      ],
      { session }
    );
    if (!insertEmployeeDetails) {
      throw new AppError(httpStatus.BAD_REQUEST, "Somethign went wrong");
    }

    await session.commitTransaction();
    await session.endSession();
    return insertEmployeeDetails[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
// signi
const SigninHomeOwner = async (payload) => {
  const { email, password } = payload;
  const user = await User.isUserExist(email);
  console.log(user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exist with this email!");
  }
  if (user?.role !== "homeowner") {
    throw new AppError(httpStatus.NOT_FOUND, "you are not authorized!");
  }
  const { password: hasedPassword } = user;
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    hasedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password do not match.");
  }

  const findHomeOwner = await HomeOwner.findOne({ user: user?._id });
  // if (!verified) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "please verify your account first!"
  //   );
  // }

  const { password: newsdfd, ...others } = user.toObject();

  const jwtPayload = {
    userId: user?._id,
    email: user.email,
    role: user.role,
    id: user?.id,
    verified: user.verified,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    user: {
      ...others,
      homes: findHomeOwner?.homes,
      trialStatus: dateCompare(new Date(), user?.trialExpirationDate),
    },
    accessToken,
    refreshToken,
  };
};
// signi
const SigninEmployee = async (payload) => {
  const { email, password } = payload;
  const user = await User.isUserExist(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exist with this email!");
  }
  const findEmployee = await Employee.findOne({ id: user?.id });
  if (user?.role !== "employee") {
    throw new AppError(httpStatus.NOT_FOUND, "you are not authorized!");
  }

  if (!findEmployee || findEmployee?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Your account is deleted!");
  }
  const { password: hasedPassword } = user;
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    hasedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password do not match!");
  }
  // if (!verified) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "please verify your account first!"
  //   );
  // }

  const { password: newsdfd, ...others } = user.toObject();
  const jwtPayload = {
    userId: user?._id,
    employeeId: findEmployee?._id,
    email: user.email,
    role: user.role,
    id: user?.id,
    verified: user?.verified,
    homeOwnerId: findEmployee?.homeOwner,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    user: others,
    accessToken,
    refreshToken,
  };
};

// refresh token
const refreshToken = async (token) => {
  const decodeToken = verifyToken(token, config.jwt_refresh_secret);
  if (!verifyToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }
  const { userId, email, verified } = decodeToken;
  const jwtPayload = {
    userId,
    email,
    verified,
  };
  const accessToken = createToken(
    jwtPayload,
    jwt_access_secret,
    jwt_access_expires_in
  );
  return {
    accessToken,
  };
};

// forget password
const forgotPassword = async ({ email, newPassword, confirmPassword }) => {
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not exist with this email");
  }
  const isOtpVerified = await Otp.findOne({
    email: email,
    type: "forgotPassWordVerification",
  }).sort({ createdAt: -1 });
  if (!isOtpVerified?.verificationStatus) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }
  if (newPassword !== confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Confirm password and New password do not match"
    );
  }
  const hasedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await User.findByIdAndUpdate(
      isUserExist?._id,
      {
        password: hasedPassword,
        passwordChangedAt: new Date(),
      },
      { new: true, session }
    );
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Something went wrong. please try again "
      );
    }
    await Otp.deleteMany({ email: email, type: "forgotPassWordVerification" });
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

  return result;
};

const resetPassword = async (id, payload) => {
  const { oldPassword, newPassword } = payload;
  console.log(id, payload);
  const isUserExist = await User.checkUserExistById(id);
  console.log(isUserExist);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Information Not Found");
  }

  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password do not match");
  }
  if (payload?.newPassword !== payload?.confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password and Confirm password do not match"
    );
  }
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword, passwordChangedAt: new Date() },
    { new: true }
  );

  return result;
};

// send email after signup

const sendEmailAndPassword = async (payload) => {
  await sendEmail(
    payload?.email,
    "Your Tidy Bayti Gmail And Password",
    "Your Gmail And Password Is:",
    `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;"><p>Email: ${payload?.email}</p><p>Password: ${payload?.password}</p></div>
  `
  );
};

const authServices = {
  SigninHomeOwner,
  refreshToken,
  forgotPassword,
  resetPassword,
  signupHomeOwnerIntoDB,
  signupEmployeeIntoDb,
  SigninEmployee,
  sendEmailAndPassword,
};
export default authServices;
