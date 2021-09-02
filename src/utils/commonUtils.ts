import moment from 'moment';
import mongoose from 'mongoose';
import { nodeEnv } from '../config';

export const timeStamp = (): string => moment().format('DDMMYYYY:HH:mm:ss');

export const mongoId = (id: string | undefined = undefined): mongoose.Types.ObjectId =>
  mongoose.Types.ObjectId(id);

export const isFunction = (functionToCheck: any): boolean =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export const isProduction = (): boolean => ['production'].includes(nodeEnv);

export const toFixedDecimal = (num: number | string): number =>
  Math.round((Number(num) + Number.EPSILON) * 100) / 100;

export const toUppercase = (str: string): string => str.toUpperCase();

export const stringId = (id: string | mongoose.Types.ObjectId) => id.toString();

export const randomNum = (min = 0, max = 100) => {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};
