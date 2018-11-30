module.exports = async function(req, res, next) {
  // user should be attached by this point if a valid token was present
  if (req.user) {
    return next();
  } else {
    return res.status(400).send({ errors: [{ message: 'not authenticated' }]});
  }
};

