const DB = require('../../common/inMemoryDB');
const Handler = require('../../helperError/error');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Handler.ErrorHandler(404, `The user with id: ${id} not found`);
  } else {
    return user;
  }
};

const create = async user => {
  return DB.createUser(user);
};

const update = async (id, name, login, password) => {
  return await DB.updateUser(id, name, login, password);
};

const remove = async id => DB.removeUser(id);

module.exports = { getAll, get, create, update, remove };
