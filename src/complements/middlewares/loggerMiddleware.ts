/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

type IObj = Request['body'] | Request['query'];

const isEmpty = (obj: IObj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const validObject = (obj: IObj) => obj && !isEmpty(obj);

const printObject = (title: string, obj: IObj) => console.log(`${title}: ${JSON.stringify(obj)}`);

const sanitizeData = (obj: IObj) => {
  const data = { ...obj };
  if (data.password) data.password = '[FILTERED]';
  return data;
};

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const timestamp = moment().format('DD-MM-YYYY HH:mm:ss');
  console.log(``);
  console.log(`-----------------------------------`);
  console.log(`[${timestamp}] ${req.method} ${req.path} ${ip}`);
  if (validObject(req.body)) printObject('Data', sanitizeData(req.body));
  if (validObject(req.query)) printObject('Query', sanitizeData(req.query));
  next();
};

export default loggerMiddleware;
