import SuperError from './SuperError';
import msg from '../../utils/msg';

export const NOT_FOUND_ERROR = 'NotFoundError';

class NotFoundError extends SuperError {
  constructor(message: string = msg.NOT_FOUND_ERROR) {
    super(message, 404, 'error');
    this.name = NOT_FOUND_ERROR;
  }
}

export default NotFoundError;
