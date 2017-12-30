export * from './user';
export * from './buoy';

/**
 * A handler for controllers to apply the params and execute the controller within a try
 * catch block and return the response
 * @param {Promise} promise
 * @param {Function} params
 * @param {boolean} withAuth
 */
export const controllerHandler = (promise, params, withAuth = false) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    if (withAuth) {
      if (!req.session.user.userId) {
        res.status(403);
        res.write('You must be logged in to access this feature.');
        return res.end();
      }
    }
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500);
    res.write(`${error.message}`);
    console.log({ message: error.message, stack: error.stackTrace, code: error.statusCode || 500, });
    return res.end();
  }
};
