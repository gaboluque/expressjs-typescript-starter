import SuperError from './SuperError';
import msg from '../../utils/msg';

export const UNAUTHORIZED_ERROR = 'UnauthorizedError';

class UnauthorizedError extends SuperError {
  constructor() {
    super(msg.UNAUTHORIZED_ERROR, 401, 'warning');
    this.name = UNAUTHORIZED_ERROR;
  }
}

export default UnauthorizedError;
