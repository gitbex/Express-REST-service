const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const Handler = require('../../helperError/error');

const getCredentials = async (login, password) =>
  await User.findByCredentials(login, password);

const getAll = async () => User.find({});

const get = async id => {
  // User.exists({ _id: id }, err => {
  //   if (err) {
  //     throw new Handler.ErrorHandler(403, 'Forbidden');
  //   }
  //   const user = User.findById(id);
  //   return user;
  // });

  const user = await User.findById(id);
  if (!user) {
    throw new Handler.ErrorHandler(404, `The user with id: ${id} not found`);
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
  // const user = await User.updateOne({ _id: id }, body);
  // this is another option to use
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
