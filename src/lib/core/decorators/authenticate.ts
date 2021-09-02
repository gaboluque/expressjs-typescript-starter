import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import authentication from '../../../complements/middlewares/authentication';
import exceptionWrapper from '../../../complements/helpers/exceptionWrapper';

export const Authenticate = (target: any, key: string) => {
  const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

  middlewares.push(exceptionWrapper(authentication));

  Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
};
