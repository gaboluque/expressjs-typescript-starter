import { matchedData, ValidationError, validationResult } from 'express-validator';
import { NextFunction, Response, Request } from 'express';
import SanitizationError from '../exceptions/SanitizationError';

const sanitization = (sanitizer: any[]): unknown[] => [
  sanitizer,
  (req: Request, _res: Response, next: NextFunction) => {
    const errorFormatter = ({ msg }: ValidationError) => ({ msg });
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      throw new SanitizationError(
        errors
          .array()
          .map((x) => x.msg)
          .join(', ')
      );
    }

    req.permittedParams = matchedData(req);
    next();
  },
];

export default sanitization;
