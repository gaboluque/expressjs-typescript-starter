import { Request, Response } from 'express';
import responseFormatter from '../helpers/templates/responseFormatter';

export const statusMiddleware = (req: Request, res: Response) => {
  res.send(responseFormatter({ process: process.pid }, 'OK'));
};
