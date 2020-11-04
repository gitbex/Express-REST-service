const jwt = require('jsonwebtoken');
const { User } = require('../resources/users/user.model');
const { JWT_SECRET_KEY } = require('../common/config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decode = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    return next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
