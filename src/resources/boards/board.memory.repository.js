const DB = require('../../common/inMemoryDB.board');
const Handler = require('../../helperError/error');

const getAll = async () => DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);
  if (!board) {
    throw new Handler.ErrorHandler(404, `The user with id: ${id} not found`);
  } else {
    return board;
  }
};

const create = board => {
  return DB.createBoard(board);
};

const update = async (
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
  return DB.updateBoard(
    id,
    title,
    columnId,
    columnTitle,
    columnOrder,
    columnId2,
    columnTitle2,
    columnOrder2
  );
};

const remove = async id => DB.removeBoard(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
