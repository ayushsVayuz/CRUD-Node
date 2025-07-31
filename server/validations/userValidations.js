import Joi from "joi";

/**
 * @return {Joi.ObjectSchema} Joi schema for validating user creation or update
 */
export const userValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^(?!.*[ '\-]{2,})(?!^[ '\-])(?!.*[ '\-]$)[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
    )
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base":
        "Name must contain only letters, single spaces, hyphens, or apostrophes. It must not start or end with a space or hyphen.",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .max(250)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid email address.",
      "string.max": "Email cannot exceed 250 characters",
      "string.empty": "Email is required",
    }),

  about: Joi.string()
    .pattern(/^(?!.*[\s-]{2,})(?![\s-])(?!.*[\s-]$)[\w\s\-!@#$%^&*()_.,'"]+$/)
    .min(10)
    .max(200)
    .required()
    .messages({
      "string.pattern.base":
        "About must not start or end with a space or hyphen, and cannot contain multiple spaces or hyphens.",
      "string.min": "About must be at least 10 characters long",
      "string.max": "About can't exceed 200 characters",
      "string.empty": "About is required",
    }),

  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be exactly 10 digits and should have only numbers.",
      "string.empty": "Phone number is required",
    }),
  location: Joi.string()
    .pattern(/^(?!.*[\s-]{2,})(?![\s-])(?!.*[\s-]$)[\w\s\-!@#$%^&*()_.,'"]+$/)
    .max(50)
    .min(5)
    .required()
    .messages({
      "string.pattern.base":
        "Location must not start or end with a space or hyphen, and cannot contain multiple spaces or hyphens.",
      "string.min": "Location  must be at least 5 characters long",
      "string.max": "Location  can't exceed 50 characters",
      "string.empty": "Location is required",
    }),

  status: Joi.boolean().required().messages({
    "boolean.base": "Status must be a boolean value (true or false)",
    "any.required": "Status is required",
  }),

  image: Joi.string().uri().optional(),
});

/**
 * @return {Joi.ObjectSchema} Joi schema for validating only user status update
 */
export const userStatusValidationSchema = Joi.object({
  status: Joi.boolean().required().messages({
    "boolean.base": "Status must be a boolean value (true or false)",
    "any.required": "Status is required",
  }),
});

/**
 * @return {Joi.ObjectSchema} Joi schema for validating user signup
 */
export const authSignupSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^(?!.*[ '\-]{2,})(?!^[ '\-])(?!.*[ '\-]$)[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/
    )
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.pattern.base":
        "Name must contain only letters, single spaces, hyphens, or apostrophes. It must not start or end with a space or hyphen.",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .max(250)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid email address.",
      "string.max": "Email cannot exceed 250 characters.",
      "string.empty": "Email is required.",
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be exactly 10 digits and should have only numbers.",
      "string.empty": "Phone number is required",
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/)
    .custom((value, helpers) => {
      if (/\s{2,}/.test(value)) {
        return helpers.message(
          "Password cannot contain multiple consecutive spaces."
        );
      }
      if (/^\s|\s$/.test(value)) {
        return helpers.message("Password cannot start or end with spaces.");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.name":
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    }),
});

/**
 * @return {Joi.ObjectSchema} Joi schema for validating user login
 */
export const authLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .max(250)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid email address.",
      "string.max": "Email cannot exceed 250 characters.",
      "string.empty": "Email is required.",
    }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/)
    .custom((value, helpers) => {
      if (/\s{2,}/.test(value)) {
        return helpers.message(
          "Password cannot contain multiple consecutive spaces."
        );
      }
      if (/^\s|\s$/.test(value)) {
        return helpers.message("Password cannot start or end with spaces.");
      }
      return value;
    })
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.name":
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    }),
});
