const User = require('../resources/users/user.model');
const DB_Task = require('./inMemoryDB.task');
const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => {
  return DB.slice(0);
};

const getUser = async id => DB.filter(el => el.id === id)[0];

const createUser = async user => {
  DB.push(user);
  return user;
};

const updateUser = async (id, name, login, password) => {
  const result = DB.map(el => {
    if (el.id === id) {
      el.name = name;
      el.login = login;
      el.password = password;
      return el;
    }
  });
  return result;
};

const removeUser = async id => {
  const result = DB.map((el, index) => {
    if (el.id === id) {
      DB.splice(index, 1);
      DB_Task.DB.forEach(val => {
        // if (val.boardId === id) {
        // console.log(val);
        val.userId = null;
        // }
      });
    }
  });
  return result;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
