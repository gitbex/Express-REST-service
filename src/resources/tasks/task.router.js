const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');

router.route('/').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);
    res.status(200).send(tasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.boardId) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
  } catch (error) {
    return next(error);
  }
  const newTask = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });
  const tasks = await taskService.create(newTask);
  res.status(200).send(tasks);
});

router.route('/:id').get(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.boardId || !req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const tasks = await taskService.get(req.params.boardId, req.params.id);
    res.status(200).send(tasks);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id || !req.params.boardId) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const task = await taskService.update(
      req.params.id,
      req.body.title,
      req.body.order,
      req.body.description,
      req.body.userId,
      req.params.boardId,
      req.body.columnId
    );
    res.status(200).send(task);
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    if (!req.params.id || !req.params.boardId) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const task = await taskService.remove(req.params.id, req.params.boardId);

    res.status(200).send(task);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
