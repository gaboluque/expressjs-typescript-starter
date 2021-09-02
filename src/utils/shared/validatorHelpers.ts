import { ParamSchema, query, Schema } from 'express-validator';
import msg from '../msg';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObject = (item: any) => !item || (typeof item === 'object' && !Array.isArray(item));

export const arrayElementsInEnum = (list: string[]) => {
  return (item: string[]): boolean => {
    let arrayOk = true;
    for (let i = 0; i < item.length && arrayOk; i += 1) {
      arrayOk = list.includes(item[i]);
    }
    return arrayOk;
  };
};

type existsType = {
  options: { checkFalsy: boolean };
  errorMessage: string;
  bail: boolean;
};
export const existsValidator = (errorMessage: string, checkFalsy = true): existsType => ({
  options: { checkFalsy },
  errorMessage,
  bail: true,
});

type lengthType = {
  options: { min?: number; max?: number };
  errorMessage: string;
};
export const lengthValidator = (
  { min, max }: { min?: number; max?: number },
  errorMessage: string
): lengthType => ({
  options: { min, max },
  errorMessage,
});

type enumType = {
  options: string[][];
  errorMessage: string;
};
export const enumValidator = (options: string[], errorMessage: string): enumType => ({
  options: [options],
  errorMessage,
});

type customType = {
  options: any;
  errorMessage: string;
};
export const customValidator = (validator: any, errorMessage: string): customType => ({
  options: validator,
  errorMessage,
});

export const paramIdValidator = (key: string): Schema => ({
  [key]: {
    in: 'params',
    isMongoId: { errorMessage: msg.INVALID_ID },
  },
});

export const tokenValidator = (errorMessage: string): ParamSchema => ({
  trim: true,
  isLength: lengthValidator({ min: 6, max: 6 }, errorMessage),
});

export const paginationValidators = [
  query('query').custom(isObject).withMessage(msg.INVALID_FILTERS),
  query('pagination.sort').custom(isObject).withMessage(msg.INVALID_SORTING),
  query('pagination.page').isNumeric().withMessage(msg.INVALID_PAGE),
  query('pagination.limit').isNumeric({ no_symbols: false }).withMessage(msg.INVALID_LIMIT),
];
