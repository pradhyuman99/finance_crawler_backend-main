const { createLogger, format, transports } = require('winston');

// Logger configuration
const logger = createLogger({
  transports:
      new transports.File({
      filename: 'logs/server.log',
      format:format.combine(
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}),
  });

  logger.info("UserAction");

  module.exports = logger;