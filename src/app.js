const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const methodOverride = require('method-override');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const createError = require('http-errors');
const morgan = require('morgan');
const winston = require('./helperError/winston');
const bodyParser = require('body-parser');
const { handleError } = require('./helperError/error');
require('express-async-errors');
// const helmet = require('helmet')
// const cors = require('cors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':date[web], METHOD::method, URL::url, STATUS::status, TIME::response-time ms, RES::res[content-length]',
    {
      stream: winston.stream
    }
  )
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  if (err.statusCode === undefined) {
    console.error(err.stack);
    res.status(500).send(`500. Internal Server Error ${err.message}`);
    next();
    return;
  }
  handleError(err, res);
  // next();
});

app.use('/', async (req, res) => {
  res.status(404).send(createError.NotFound('This page not found'));
});

module.exports = app;
