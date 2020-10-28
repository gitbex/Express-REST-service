const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const Handler = require('../../helperError/error');

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new Handler.ErrorHandler(404, `The user with id: ${id} not found`);
  } else {
    return user;
  }
};

const create = async user => User.create(user);

const update = async (id, body) => User.updateOne({ _id: id }, body);

const remove = async id => {
  await Task.updateMany({ userId: id }, { $set: { userId: null } });
  return User.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
