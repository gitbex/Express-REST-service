const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

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
) =>
  boardsRepo.update(
    id,
    title,
    columnId,
    columnTitle,
    columnOrder,
    columnId2,
    columnTitle2,
    columnOrder2
  );

const remove = id => boardsRepo.remove(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
