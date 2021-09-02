import msg from '../../utils/msg';
import logHandler from '../subscribers/logSubscriber';
import SuperError from './SuperError';

export const SERVER_ERROR = 'ServerError';

class ServerError extends SuperError {
  constructor(error: Error | any) {
    super(msg.SERVER_ERROR, 500, 'error');
    this.name = SERVER_ERROR;
    logHandler.emit('error', error);
  }
}

export default ServerError;
