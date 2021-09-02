import SuperError from './SuperError';
import msg from '../../utils/msg';

export const FORBIDDEN_ERROR = 'ForbiddenError';

class ForbiddenError extends SuperError {
  constructor() {
    super(msg.FORBIDDEN_ERROR, 403, 'error');
    this.name = FORBIDDEN_ERROR;
  }
}

export default ForbiddenError;
