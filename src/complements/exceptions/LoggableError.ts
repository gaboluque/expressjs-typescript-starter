import logHandler from '../subscribers/logSubscriber';
import SuperError from './SuperError';

export const LOGGABLE_ERROR = 'LoggableError';

class LoggableError extends SuperError {
  constructor(message: string, data: any = {}, error: Error = new Error()) {
    super(message, 500, 'error');
    this.name = LOGGABLE_ERROR;
    const err = error && error.stack ? error : new Error();
    logHandler.emit('error', `${err.stack} \n DATA: \n${JSON.stringify(data)}`);
  }
}

export default LoggableError;
