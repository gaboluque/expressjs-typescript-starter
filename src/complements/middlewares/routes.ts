import { Request, Response } from 'express';
import { AppRouter } from '../../lib/core/AppRouter';

export const routesMiddleware = (req: Request, res: Response) => {
  res.send(AppRouter.getRoutes());
};
