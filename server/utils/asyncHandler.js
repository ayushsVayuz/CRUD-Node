/**
 * @param {Function} fn - Asynchronous route handler function
 * @return {Function} Middleware function that catches errors from async functions
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
