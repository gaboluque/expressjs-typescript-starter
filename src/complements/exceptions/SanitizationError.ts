import SuperError from './SuperError';

export const SANITIZATION_ERROR = 'SanitizationError';

class SanitizationError extends SuperError {
  constructor(errors: string) {
    super(errors, 400, 'warning');
    this.name = SANITIZATION_ERROR;
  }
}

export default SanitizationError;
