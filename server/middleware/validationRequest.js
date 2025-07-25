/**
 * @param {Object} schema - Joi validation schema to apply on the request body
 * @return {Function} Middleware function that validates the request and returns 400 on error
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};
