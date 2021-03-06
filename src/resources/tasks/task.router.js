const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');
const auth = require('../../middleware/auth');

// Get task by boardID
router.route('/').get(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);
    res.json(tasks.map(task => Task.toResponse(task)));
  } catch (error) {
    return next(error);
  }
});

// Create Task
router.route('/').post(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.boardId) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const tasks = await taskService.create(
      new Task.Task({
        ...req.body,
        boardId: req.params.boardId
      })
    );
    res.json(Task.toResponse(tasks));
  } catch (error) {
    return next(error);
  }
});

// Get Task by ID
router.route('/:id').get(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id || !req.params.boardId) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const { id, boardId } = req.params;
    const task = await taskService.get(boardId, id);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

// Update Task
router.route('/:id').put(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id || !req.params.boardId) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const { id, boardId } = req.params;
    const task = await taskService.update(id, boardId, req.body);
    res.json(Task.toResponse(task));
  } catch (error) {
    return next(error);
  }
});

// Delete Task
router.route('/:id').delete(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id || !req.params.boardId) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const { id, boardId } = req.params;
    const task = await taskService.remove(id, boardId);
    res.send(task);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
