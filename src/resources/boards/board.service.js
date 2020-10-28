const boardRepo = require('./board.db.repository');

const getAll = async () => boardRepo.getAll();

const get = id => boardRepo.get(id);

const create = user => boardRepo.create(user);

const update = (id, body) => boardRepo.update(id, body);

const remove = id => boardRepo.remove(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
