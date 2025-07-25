import User from "../models/user.js";
import cloudinary from "../cloudinary/cloudinary.js";

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

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
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
    const updatedUser = await User.findByIdAndUpdate(id, updatedStatus, {
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
