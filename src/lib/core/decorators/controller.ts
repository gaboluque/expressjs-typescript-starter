import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import exceptionWrapper from '../../../complements/helpers/exceptionWrapper';
import { AppRouter } from '../AppRouter';

export const Controller = (routePrefix: string) => (target: any) => {
  const router = AppRouter.getInstance();

  const { prototype } = target;

  Object.keys(prototype).forEach((key) => {
    const routeHandler = exceptionWrapper(prototype[key]);
    const path = Reflect.getMetadata(MetadataKeys.path, prototype, key);
    const prePath = Reflect.getMetadata(MetadataKeys.prePath, prototype, key);
    const method: Methods = Reflect.getMetadata(MetadataKeys.method, prototype, key);
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, prototype, key) || [];

    if (path) {
      router[method](`${prePath}${routePrefix}${path}`, [...middlewares], routeHandler);
    }
  });
};
