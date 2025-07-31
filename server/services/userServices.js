import {User, authSignup} from "../models/user.js";
import cloudinary from "../cloudinary/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET 

/**
 * @return {Promise<Array>} List of all users
 */
export const allUsersService = async () => { 
    const response = await User.find();
    return response;
};

/**
 * @param {string} id - ID of the user to retrieve
 * @return {Promise<Object|null>} The user object or null if not found
 */
export const specificUserService = async (id) => { 
    const response = await User.findById(id);
    return response;
};


/**
 * @param {Object} data - User data from the request body
 * @param {Object} file - Uploaded image file (optional)
 * @return {Promise<Object>} The newly created user
 */
export const createUserService = async (data, file) => {
  const { name, email, about, phone, location, status } = data;

  let imageUrl = null;
  if (file) {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "users",
    });
    imageUrl = uploadResult.secure_url;
  }

  const userData = {
    name,
    email,
    about,
    phone,
    location,
    status: status === "true", 
    image: imageUrl,
  };

  const newUser = await User.create(userData);
  return newUser;
};


/**
 * @param {string} id - ID of the user to update
 * @param {Object} data - Updated user data
 * @param {Object} file - Uploaded image file (optional)
 * @return {Promise<Object|null>} The updated user or null if not found
 */
export const updateUserService = async (id, data, file) => {
  const updateData = { ...data };

  if (file) {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "users",
    });
    updateData.image = uploadResult.secure_url; 
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, { // Needs to use update method beaccuse findbyidupdate is depreciated
    new: true,
    runValidators: true, 
  });
  return updatedUser;
};


/**
 * @param {string} id - ID of the user to update
 * @param {Object} updatedStatus - Object containing the new status
 * @return {Promise<Object|null>} The updated user or null if not found
 */
export const updateUserStatusService = async (id, updatedStatus) => {
    const updatedUser = await User.findByIdAndUpdate(id, updatedStatus, { // use update here instead of findbyidandupdate
      new: true,
    });
    return updatedUser;
};


/**
 * @param {string} id - ID of the user to delete
 * @return {Promise<Object|null>} The deleted user or null if not found
 */
export const deleteUserService = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
};

/**
 * @param {Object} userData - User data for signup
 * @return {Promise<Object>} The newly created user object
 */
export const signupService = async ({ name, email, password, phone }) => {
  const existingUser = await authSignup.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authSignup.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  };
};

/**
 * @param {Object} credentials - User login credentials
 * @return {Promise<string>} JWT token for the user
 */
export const loginService = async ({ email, password }) => {
  const user = await authSignup.findOne({ email }); 
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
