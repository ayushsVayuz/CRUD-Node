import { HTTP_STATUS } from "../config/httpStatusCode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  allUsersService,
  specificUserService,
  createUserService,
  updateUserService,
  updateUserStatusService,
  deleteUserService,
} from "../services/userServices.js";


/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Promise<void>}
 */
export const getUsersController = asyncHandler(async (req, res, next) => {
  const response = await allUsersService();
  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Success", data: response });
});

/**
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Promise<void>}
 */
export const getSpecificUserController = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.id;
    const response = await specificUserService(userId);
    return res.status(HTTP_STATUS.OK).json({
      message: "Success",
      data: response,
    });
  }
);

/**
 * @param {Object} req - Express request object containing user data and optional file
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
export const createUserController = asyncHandler(async (req, res) => {
  const response = await createUserService(req.body, req.file);

  return res.status(HTTP_STATUS.CREATED).json({
    message: "User created ",
    data: response,
  });
});


/**
 * @param {Object} req - Express request object containing user ID, data, and optional file
 * @param {Object} res - Express response object
 * @return {Promise<void>}
 */
export const updateUserController = asyncHandler(async (req, res) => {
  const response = await updateUserService(req.params.id, req.body, req.file);

  return res.status(HTTP_STATUS.OK).json({
    message: "User updated.",
    data: response,
  });
});


/**
 * @param {Object} req - Express request object containing user ID and status in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Promise<void>}
 */
export const updateUserStatusController = asyncHandler(
  async (req, res, next) => {
    const response = await updateUserStatusService(req.params.id, req.body);
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Success", data: response });
  }
);

/**
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Promise<void>}
 */
export const deleteUserController = asyncHandler(async (req, res, next) => {
  const response = await deleteUserService(req.params.id);
  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Success", data: response });
});
