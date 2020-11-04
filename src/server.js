const { connectToDB } = require('./mongodb/mangoose');
const { PORT } = require('./common/config');
const logger = require('./helperError/winston');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});

// Exceptions catcher
process.on('uncaughtException', err => {
  setTimeout(() => {
    logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
    logger.error(err.stack);
  }, 2000);
  // eslint-disable-next-line no-process-exit
  process.exit(0);
});
process.on('unhandledRejection', error => {
  setTimeout(() => {
    logger.error('Unhandled Rejection at:', error.stack || error);
  }, 2000);
  // eslint-disable-next-line no-process-exit
  process.exit(0);
});
