const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../helperError/winston');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    logger.info('connected to db');
    cb();
  });
};

module.exports = { connectToDB };
