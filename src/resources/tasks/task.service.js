const TaskRepo = require('./task.db.repository');

const getAll = boardId => TaskRepo.getAll(boardId);
const get = (boardId, id) => {
  const result = TaskRepo.get(boardId, id);
  return result;
};
const create = newTask => TaskRepo.create(newTask);
const update = (id, boardId, body) => TaskRepo.update(id, boardId, body);
const remove = (id, boardId) => TaskRepo.remove(id, boardId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
