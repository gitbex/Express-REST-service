// const Task = require('./task.model');
const DB = require('../../common/inMemoryDB.task');

const getAll = async boardId => {
  const result = await DB.getAllTasks(boardId);
  // console.log(result);
  return result;
};

const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);
  if (!task) {
    throw new Error(`The user with id: ${boardId} not found`);
  } else {
    return task;
  }
};

const create = async newTask => {
  return DB.createTask(newTask);
};

const update = async (
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  return DB.updateTask(
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};

const remove = async (id, boardId) => DB.removeTask(id, boardId);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
