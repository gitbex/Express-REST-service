const Board = require('../resources/boards/board.model');
const DB_Task = require('./inMemoryDB.task');

const DB = [];

DB.push(new Board(), new Board(), new Board());

const getAllBoards = async () => {
  return DB.slice(0);
};

const getBoard = async id => DB.filter(el => el.id === id)[0];

const createBoard = async board => {
  DB.push(board);
  return board;
};

const updateBoard = (
  id,
  title,
  columnId,
  columnTitle,
  columnOrder,
  columnId2,
  columnTitle2,
  columnOrder2
  // eslint-disable-next-line max-params
) => {
  const result = DB.map(el => {
    if (el.id === id) {
      el.title = title;
      el.columns[0].id = columnId;
      el.columns[0].title = columnTitle;
      el.columns[0].order = columnOrder;
      el.columns[1].id = columnId2;
      el.columns[1].title = columnTitle2;
      el.columns[1].order = columnOrder2;
      return el;
    }
  });
  return result;
};

const removeBoard = async id => {
  const result = DB.map((el, index) => {
    if (el.id === id) {
      DB.splice(index, 1);
      DB_Task.DB.forEach((val, indx) => {
        if (val.boardId === id) {
          DB_Task.DB.splice(indx);
        }
      });
    }
  });
  return result;
};

module.exports = {
  DB,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
