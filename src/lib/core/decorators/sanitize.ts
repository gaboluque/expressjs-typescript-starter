import 'reflect-metadata';
import { checkSchema, Schema } from 'express-validator';
import { MetadataKeys } from './MetadataKeys';
import sanitization from '../../../complements/middlewares/sanitization';

export const Sanitize = (sanitizer: Schema) => (target: any, key: string) => {
  let middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

  middlewares = [...middlewares, ...sanitization(checkSchema(sanitizer))];

  Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
};
