import 'reflect-metadata';
import { RequestHandler, Request } from 'express';
import { MetadataKeys } from './MetadataKeys';

export const Use = (middleware: RequestHandler<undefined, any, Request>) => (
  target: never,
  key: string
): void => {
  const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

  Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
};
