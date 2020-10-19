const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');

router.route('/').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});
router.route('/').post(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.body.login || !req.body.password || !req.body.name) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (
      !req.params.id ||
      !req.body.name ||
      !req.body.login ||
      !req.body.password
    ) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.update(
      req.params.id,
      req.body.name,
      req.body.login,
      req.body.password
    );

    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.remove(req.params.id);
    res.json(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
