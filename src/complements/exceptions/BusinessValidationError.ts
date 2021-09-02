import SuperError from './SuperError';

export const BUSINESS_VALIDATION_ERROR = 'BusinessValidationError';

class BusinessValidationError extends SuperError {
  constructor(message: string) {
    super(message, 400, 'warning');
    this.name = BUSINESS_VALIDATION_ERROR;
  }
}

export default BusinessValidationError;
