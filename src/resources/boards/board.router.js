const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const Handler = require('../../helperError/error');
const LoggerReqRes = require('../../helperError/requestLogger');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});
router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: [
        { title: req.body.columns[0].title, order: req.body.columns[0].order },
        { title: req.body.columns[1].title, order: req.body.columns[1].order }
      ]
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res, next) => {
  LoggerReqRes.loggerReqRes(req);
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const board = await boardService.update(
      req.params.id,
      req.body.title,
      req.body.columns[0].id,
      req.body.columns[0].title,
      req.body.columns[0].order,
      req.body.columns[1].id,
      req.body.columns[1].title,
      req.body.columns[1].order
    );
    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Handler.ErrorHandler(404, 'Please provide correct parameters');
    }
    const board = await boardService.remove(req.params.id);

    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
