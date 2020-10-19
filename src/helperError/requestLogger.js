const fs = require('fs');
const writeStream = fs.createWriteStream('./src/helperError/logs/request.log', {
  flags: 'a'
});
class LoggerReqRes {
  static loggerReqRes(val) {
    writeStream.write(
      `Request time: ${new Date().toLocaleString('en-US')} \r\n`,
      'utf-8'
    );
    if (!(JSON.stringify(val.originalUrl) === '{}')) {
      writeStream.write(
        `Request url: ${JSON.stringify(val.originalUrl)} \r\n`,
        'utf-8'
      );
    }
    if (!(JSON.stringify(val.body) === '{}')) {
      writeStream.write(
        `Request body: ${JSON.stringify(val.body)} \r\n`,
        'utf-8'
      );
    }
    if (!(JSON.stringify(val.query) === '{}')) {
      writeStream.write(
        `Request query: ${JSON.stringify(val.query)} \r\n`,
        'utf-8'
      );
    }
    if (!(JSON.stringify(val.params) === '{}')) {
      writeStream.write(
        `Request params: ${JSON.stringify(val.params)} \r\n`,
        'utf-8'
      );
    }
    writeStream.write(' ------end------- \r\n');
  }
}

module.exports = LoggerReqRes;
