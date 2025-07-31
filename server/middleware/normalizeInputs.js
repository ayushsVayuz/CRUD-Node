/**
 * Normalizes input by trimming extra spaces from all string fields in the request body.
 *
 * @param {Object} req - Express request object containing the input data.
 * @param {Object} res - Express response object.
 * @param {Function} next - Function to pass control to the next middleware.
 * @returns {void}
 */
export function normalizeInput(req, res, next) {
  const sanitizeString = (value) => {
    if (typeof value !== "string") return value;
    return value.replace(/\s+/g, " ").trim(); 
  };

  const sanitizeObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeObject(obj[key]);
      } else {
        obj[key] = sanitizeString(obj[key]);
      }
    }
  };

  if (req.body) sanitizeObject(req.body);
  next();
}
