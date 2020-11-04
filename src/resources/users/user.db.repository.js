const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const Handler = require('../../helperError/error');

const getCredentials = async (login, password) =>
  await User.findByCredentials(login, password);

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new Handler.ErrorHandler(403, 'Forbidden');
  } else {
    return user;
  }
};

const create = async user => {
  const result = await User.create(user);
  return result;
};

const update = async (id, body) => {
  const toUpdate = Object.keys(body);
  const user = await User.findById(id).exec();
  toUpdate.forEach(val => (user[val] = body[val]));
  await user.save();
  return user;
};

const remove = async id => {
  await Task.updateMany({ userId: id }, { $set: { userId: null } });
  return User.deleteOne({ _id: id });
};

module.exports = {
  getCredentials,
  getAll,
  get,
  create,
  update,
  remove
};
