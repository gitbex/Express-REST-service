const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await taskService.getAll(boardId);
  res.status(200).send(tasks);
});

router.route('/').post(async (req, res) => {
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

router.route('/:id').get(async (req, res) => {
  try {
    const tasks = await taskService.get(req.params.boardId, req.params.id);
    res.status(200).send(tasks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
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
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.remove(req.params.id, req.params.boardId);

  res.status(200).send(task);
});

module.exports = router;
