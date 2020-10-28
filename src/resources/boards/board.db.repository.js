const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const Handler = require('../../helperError/error');

// Get all Boards
const getAll = async () => Board.find({});

// Get Board from ID
const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new Handler.ErrorHandler(404, `The user with id: ${id} not found`);
  }
  return board;
};

// Create Board
const create = board => Board.create(board);

// Update Board
const update = async (id, body) => Board.updateOne({ _id: id }, body);

// Remove Board with dependent tasks
const remove = async id => {
  await Task.deleteMany({ boardId: id });
  return Board.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
