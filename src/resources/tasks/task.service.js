const boardsRepo = require('./task.memory.repository');

const getAll = async boardId => {
  const result = await boardsRepo.getAll(boardId);
  return result;
};

const get = (boardId, taskId) => boardsRepo.get(boardId, taskId);
//
const create = newTask => boardsRepo.create(newTask);

const update = async (
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) =>
  boardsRepo.update(id, title, order, description, userId, boardId, columnId);

const remove = (id, boardId) => boardsRepo.remove(id, boardId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
