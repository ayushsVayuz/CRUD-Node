import express from "express";
import {
  getUsersController,
  getSpecificUserController,
  createUserController,
  updateUserController,
  updateUserStatusController,
  deleteUserController,
  loginController,
  signupController,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { validateRequest } from "../middleware/validationRequest.js";
import { authLoginSchema, authSignupSchema, userValidationSchema } from "../validations/userValidations.js";
import { userStatusValidationSchema } from "../validations/userValidations.js";

const router = express.Router();

/**
 * @param {Object} req - Express request to get all users
 * @param {Object} res - Express response with user list
 * @returns {void}
 */
router.get("/", getUsersController);

/**
 * @param {Object} req - Express request to get a specific user by ID
 * @param {Object} res - Express response with user data
 * @returns {void}
 */
router.get("/:id", getSpecificUserController);

/**
 * @param {Object} req - Express request to create a new user
 * @param {Object} res - Express response with created user data
 * @returns {void}
 */
router.post(
  "/",
  upload.single("image"),
  validateRequest(userValidationSchema),
  createUserController
);

/**
 * @param {Object} req - Express request to update user data by ID
 * @param {Object} res - Express response with updated user data
 * @returns {void}
 */
router.put(
  "/:id",
  upload.single("image"),
  validateRequest(userValidationSchema),
  updateUserController
);

/**
 * @param {Object} req - Express request to update user status
 * @param {Object} res - Express response with status update result
 * @returns {void}
 */
router.patch(
  "/:id/status",
  validateRequest(userStatusValidationSchema),
  updateUserStatusController
);


/**
 * @param {Object} req - Express request to delete a user
 * @param {Object} res - Express response confirming deletion
 * @returns {void}
 */
router.delete("/:id", deleteUserController);

/**
 * @param {Object} req - Express request to register a user
 * @param {Object} res - Express response with signup result
 * @returns {void}
 */
router.post("/auth/signup", validateRequest(authSignupSchema), signupController);


/**
 * @param {Object} req - Express request to log in a user
 * @param {Object} res - Express response with login result
 * @returns {void}
 */
router.post("/auth/login", validateRequest(authLoginSchema), loginController);

export default router;
