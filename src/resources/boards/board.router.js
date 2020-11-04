const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');
const auth = require('../../middleware/auth');

// Get all Board Router
router.route('/').get(auth, async (req, res) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Get Board from ID Router
router.route('/:id').get(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    return next(e);
  }
});

// Create Board
router.route('/').post(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    const board = await boardService.create(req.body);
    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

// Update Board
router.route('/:id').put(auth, async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id) {
      res.status(403).send('Forbidden');
    }
    const board = await boardService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

// Delete Board with dependent tasks
router.route('/:id').delete(auth, async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(403, 'Forbidden');
    }
    const board = await boardService.remove(req.params.id);
    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
