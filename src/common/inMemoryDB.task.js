const Task = require('../resources/tasks/task.model');

const DB = [];

const getAllTasks = async (boardId, taskId) => {
  await DB.push(new Task({ boardId, taskId }));
  return DB.slice(0);
};

const getTask = async (boardId, taskId) =>
  DB.filter(el => {
    return el.id === taskId && el.boardId === boardId;
  })[0];
//
const createTask = async newTask => {
  DB.push(newTask);
  return newTask;
};

const updateTask = (
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  const result = DB.map(el => {
    if (el.id === id && el.boardId === boardId) {
      el.title = title;
      el.order = order;
      el.description = description;
      el.userId = userId;
      el.boardId = boardId;
      el.columnId = columnId;
      return el;
    }
  });
  return result;
};

const removeTask = async (id, boardId) => {
  const result = DB.map((el, index) => {
    if (el.id === id && el.boardId === boardId) {
      DB.splice(index, 1);
    }
  });
  return result;
};

module.exports = {
  DB,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask
};
