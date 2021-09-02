/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import msg from '../../utils/msg';
import { SUPER_ERROR } from '../exceptions/SuperError';
import logSubscriber, { mongoError } from '../subscribers/logSubscriber';
import { nodeEnv } from '../../config';
import { SERVER_ERROR } from '../exceptions/ServerError';

const errorResponse = (res: Response, message: string, code = 400, type = 'error') =>
  res.status(code).json({
    success: false,
    code,
    info: { message, type },
  });

/*
 * This method should ALWAYS have 4 parameters. This tells Express to call it
 * if any middleware calls next() with an error next(error)
 * */
export default (
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (['development'].includes(nodeEnv)) {
    console.log(err.message, err.stack);
  }

  if ([SUPER_ERROR, SERVER_ERROR].includes(err.name)) {
    // You can add a Error handler like Sentry here
  }

  switch (err.name || 'serverError') {
    case SUPER_ERROR:
      return errorResponse(res, err.message, err.code, err.type);
    case 'ValidationError':
      // eslint-disable-next-line no-case-declarations
      const { errors } = err;
      return errorResponse(
        res,
        Object.keys(errors)
          .map((key) => errors[key])
          .join(', ')
      );
    case 'MongoError':
      logSubscriber.emit('error', mongoError(err));
      return errorResponse(res, msg.SERVER_DB_ERROR);
    case 'MulterError':
      return errorResponse(res, msg.EXCEEDED_PERMITTED_FILES);
    default:
      return res.status(500).json({ info: { message: err.message, type: 'error' } });
  }
};
