import cors from 'cors';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import errorHandler from './complements/middlewares/errorHandler';
import loggerMiddleware from './complements/middlewares/loggerMiddleware';
import { AppRouter } from './lib/core/AppRouter';
import { routesMiddleware } from './complements/middlewares/routes';
import { cacheCatcher } from './complements/middlewares/cache';
import './modules/auth/auth.controller';
import './modules/users/users.controller';

dotenv.config();

const app: Application = express();
app.use(express.json({ limit: '1mb' }));
app.use(helmet());
app.use(cors());
app.options('*', cors);

if (['development', 'staging'].includes(app.get('env'))) {
  app.use(loggerMiddleware);
  app.get('/routes', routesMiddleware);
}

app.use(cacheCatcher);

app.use(AppRouter.getInstance());

app.use(errorHandler);

export default app;
