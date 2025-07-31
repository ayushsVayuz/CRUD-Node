import mongoose from "mongoose";

/**
 * @param {Object} definition - Schema definition object with field rules
 * @param {Object} options - Schema options (e.g., timestamps)
 * @return {mongoose.Schema} Mongoose schema instance
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      maxlength: [250, "Email cannot exceed 250 characters"],
    },
    about: {
      type: String,
      required: [true, "About is required"],
      trim: true,
      minlength: [10, "About must be at least 10 characters long"],
      maxlength: [200, "About section can't exceed 200 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [5, "Location must be at least 5 characters long"],
      maxlength: [50, "Location can't exceed 50 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: Boolean,
      trim: true,
      validate: {
        validator: function (value) {
          return typeof value === "boolean";
        },
        message: "Status must be true or false only",
      },
    },
  },
  {
    timestamps: true,
  }
);


const authSignupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, trim: true, required: true },
    phone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const authSignup = mongoose.model("authSignup", authSignupSchema);
const User = mongoose.model("User", userSchema);

export { User, authSignup };
