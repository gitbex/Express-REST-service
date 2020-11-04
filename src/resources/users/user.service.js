const usersRepo = require('./user.db.repository');

const getCredentials = (login, password) =>
  usersRepo.getCredentials(login, password);

const getAll = () => usersRepo.getAll();

const get = id => {
  return usersRepo.get(id);
};

const create = async user => {
  const result = await usersRepo.create(user);
  return result;
};

const update = (id, body) => usersRepo.update(id, body);

const remove = id => usersRepo.remove(id);

module.exports = {
  getCredentials,
  getAll,
  get,
  create,
  update,
  remove
};
