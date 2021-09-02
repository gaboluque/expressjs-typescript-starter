import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { paginationValidators } from '../../../utils/shared/validatorHelpers';
import sanitization from '../../../complements/middlewares/sanitization';

export const HasPagination = (target: any, key: string): void => {
  const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

  Reflect.defineMetadata(
    MetadataKeys.middleware,
    [...middlewares, sanitization([...paginationValidators])],
    target,
    key
  );
};
