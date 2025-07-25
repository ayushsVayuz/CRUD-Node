import express from "express";
import {
  getUsersController,
  getSpecificUserController,
  createUserController,
  updateUserController,
  updateUserStatusController,
  deleteUserController,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { validateRequest } from "../middleware/validationRequest.js";
import { userValidationSchema } from "../validations/userValidations.js";
import { userStatusValidationSchema } from "../validations/userValidations.js";

const router = express.Router();

router.get("/", getUsersController);
router.get("/:id", getSpecificUserController);
router.post(
  "/",
  upload.single("image"),
  validateRequest(userValidationSchema),
  createUserController
);
router.put(
  "/:id",
  upload.single("image"),
  validateRequest(userValidationSchema),
  updateUserController
);
router.patch(
  "/:id/status",
  validateRequest(userStatusValidationSchema),
  updateUserStatusController
);
router.delete("/:id", deleteUserController);
export default router;
