const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

const toResponse = task => {
  const { _id, title, order, description, userId, columnId, boardId } = task;
  return { id: _id, title, order, description, userId, columnId, boardId };
};

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, toResponse };
