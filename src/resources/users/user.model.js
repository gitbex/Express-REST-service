const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    login: { type: String, required: true, trim: true, useCreateIndex: true },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { versionKey: false }
);
// eslint-disable-next-line
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error('Forbidden');
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Forbidden');
  }

  return user;
};
// eslint-disable-next-line
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = { User, toResponse };
