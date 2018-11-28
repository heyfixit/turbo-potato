const { User, AuthToken } = require('../models');

module.exports = async function(req, res, next) {
  const token = req.cookies.auth_token || req.headers.authorization;

  // Attach user if token is present
  if (token) {
    const authToken = await AuthToken.find({
      where: { token },
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    });

    if (authToken) {
      req.user = authToken.User;
    }
  }

  next();
};
