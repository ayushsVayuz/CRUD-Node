import { HTTP_STATUS } from "../config/httpStatusCode.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  allUsersService,
  specificUserService,
  createUserService,
  updateUserService,
  updateUserStatusService,
  deleteUserService,
  signupService,
  loginService,
} from "../services/userServices.js";
import crypto from "crypto";
import {
  aesEncrypt,
  aesDecrypt,
  rsaEncryptAESKey,
  rsaDecryptAESKey,
} from "../utils/hybridCrypto.js";
import simulateEncryptedApiResponse from "../utils/fakeExternalApi.js";


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
 * @return {Promise<void>} - Returns nothing directly, sends an encrypted response.
 */
export const createUserController = asyncHandler(async (req, res) => {
  const plainData = req.body;

  // Step 1: Encrypt request payload using AES
  const aesKeyReq = crypto.randomBytes(32); // AES 256-bit key
  const encryptedPayload = aesEncrypt(JSON.stringify(plainData), aesKeyReq);

  // Step 2: Encrypt AES key with RSA public key
  const encryptedKey = rsaEncryptAESKey(aesKeyReq);

  // Step 3: Simulate encrypted API response (API returns encrypted key + data)
  const apiResponse = simulateEncryptedApiResponse(encryptedPayload, encryptedKey);

  // Step 4: Decrypt API response
  const decryptedAESKey = rsaDecryptAESKey(apiResponse.key);
  const decryptedData = aesDecrypt(apiResponse.data, decryptedAESKey);
  const parsedData = JSON.parse(decryptedData);

  // Step 5: Save decrypted data to DB
  const response = await createUserService(parsedData, req.file);

  // Step 6: Encrypt the response before sending back to client
  const aesKeyRes = crypto.randomBytes(32);
  const encryptedResData = aesEncrypt(JSON.stringify(response), aesKeyRes);
  const encryptedResKey = rsaEncryptAESKey(aesKeyRes);

  return res.status(HTTP_STATUS.CREATED).json({
    message: "User created",
    data: encryptedResData,
    key: encryptedResKey,
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


export const signupController = asyncHandler(async (req, res) => {
  const user = await signupService(req.body);
  res.status(201).json({ message: "Signup successful", user });
});

export const loginController = asyncHandler(async (req, res) => {
  const token = await loginService(req.body);
  res.status(200).json({ message: "Login successful", token });
});


