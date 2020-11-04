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
    console.error(
      `${new Date().toUTCString()} uncaughtException:`,
      err.message
    );
    console.error(err.stack);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }, 2000);
});

process.on('unhandledRejection', error => {
  setTimeout(() => {
    console.log('Unhandled Rejection at:', error.stack || error);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }, 2000);
});
