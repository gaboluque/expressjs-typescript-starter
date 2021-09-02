import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import authorization from '../../../complements/middlewares/authorization';

export const Authorize = () => (target: any, key: string) => {
  const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

  Reflect.defineMetadata(
    MetadataKeys.middleware,
    [...middlewares, ...authorization()],
    target,
    key
  );
};
