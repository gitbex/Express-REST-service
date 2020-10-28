const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');

// Get all Users
router.route('/').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const users = await usersService.getAll();
    res.json(users.map(toResponse));
  } catch (error) {
    return next(error);
  }
});

// Get User by ID
router.route('/:id').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.get(req.params.id);
    res.json(toResponse(user));
  } catch (error) {
    return next(error);
  }
});

// Create User
router.route('/').post(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.body.login || !req.body.password || !req.body.name) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.create(req.body);
    res.json(toResponse(user));
  } catch (error) {
    return next(error);
  }
});

// Update User
router.route('/:id').put(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id || !req.body) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.update(req.params.id, req.body);

    res.json(toResponse(user));
  } catch (error) {
    return next(error);
  }
});

// Remove User
router.route('/:id').delete(async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const user = await usersService.remove(req.params.id);
    res.json(toResponse(user));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
