const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const methodOverride = require('method-override');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
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

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET request are disabled');
//   } else {
//     return next();
//   }
// });

// // Function for maintenance mode
// app.use((req, res) => {
//   res.status(503).send('Page under maintenance');
// });

app.use(
  morgan(
    ':date[web], METHOD::method, URL::url, STATUS::status, TIME::response-time ms, RES::res[content-length]',
    {
      stream: winston.stream
    }
  )
);
app.use('/login', loginRouter);

// app(authorisation)
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
