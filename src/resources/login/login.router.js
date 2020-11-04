const router = require('express').Router();
const LoggerReqRes = require('../../helperError/requestLogger');
const usersService = require('../users/user.service');
require('express-async-errors');

router.route('/').post(async (req, res) => {
  LoggerReqRes.loggerReqRes(req);
  const user = await usersService.getCredentials(
    req.body.login,
    req.body.password
  );
  const token = await user.generateAuthToken();
  res.status(200).send({ user, token });
});

module.exports = router;
