const { Task } = require('./task.model');
const Handler = require('../../helperError/error');
const mongoose = require('mongoose');

// Get all Tasks
const getAll = async id => Task.find({ boardId: id });

// Create Task
const create = async newTask => Task.create(newTask);

// Get task by ID
const get = async (boardId, tasksId) => {
  if (mongoose.Types.ObjectId.isValid(tasksId)) {
    const task = await Task.findOne({
      boardId,
      _id: tasksId
    }).exec();
    if (task === null) {
      throw new Handler.ErrorHandler(
        404,
        `The user with id: ${tasksId} not found`
      );
    }
    return task;
  }
};

// Update Task
const update = async (id, boardId, body) => {
  await Task.updateOne({ _id: id, boardId }, body);
  return Task.findById(id);
};

// Remove Task
const remove = async (id, boardId) =>
  Task.findOneAndDelete({ boardId, _id: id });

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
