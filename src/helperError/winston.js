const winston = require('winston');

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: './src/helperError/logs/app.log',
      level: 'debug',
      format: winston.format.json(),
      // handleExceptions: true,
      // handleRejections: true,
      colorize: true,
      json: true,
      timestamp: true
    }),
    new winston.transports.Http({
      level: 'warn',
      format: winston.format.json()
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleRejections: true
    })
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};
module.exports = logger;
