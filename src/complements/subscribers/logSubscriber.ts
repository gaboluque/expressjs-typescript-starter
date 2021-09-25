import events from 'events';
import winston from 'winston';
import moment from 'moment';
import { nodeEnv } from '../../config';

const logHandler = new events.EventEmitter();
const getTimeStamp = () => moment().format('DD-MM-YYYY HH:mm:ss');

export const mailError = (error: Error) => `MailError: ${error}`;
export const mongoError = (error: Error) => `MongoDBError: ${error}`;

type logLevel = 'warn' | 'info' | 'error';

const logMessage = (level: logLevel, message: string) => ({
  level,
  message: `[${getTimeStamp()}] ${message}`,
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: './.logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './.logs/combined.log' }),
  ],
});

if (!['production', 'test'].includes(nodeEnv)) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logHandler.on('error', (message: string) => {
  logger.log(logMessage('error', message));
});

logHandler.on('warning', (message: string) => {
  logger.log(logMessage('warn', message));
});

logHandler.on('info', (message: string) => {
  logger.log(logMessage('info', message));
});

export default logHandler;
