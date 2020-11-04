const boardRepo = require('./board.db.repository');

const getAll = async () => boardRepo.getAll();

const get = async id => {
  const result = await boardRepo.get(id);
  return result;
};

const create = async user => {
  const result = await boardRepo.create(user);
  return result;
};

const update = (id, body) => boardRepo.update(id, body);

const remove = id => boardRepo.remove(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
