import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

const routeBinder = (method: string) => (path = '', prePath = '') => (target: any, key: string) => {
  Reflect.defineMetadata(MetadataKeys.prePath, prePath, target, key);
  Reflect.defineMetadata(MetadataKeys.path, path, target, key);
  Reflect.defineMetadata(MetadataKeys.method, method, target, key);
};

export const Get = routeBinder(Methods.get);
export const Post = routeBinder(Methods.post);
export const Put = routeBinder(Methods.put);
export const Delete = routeBinder(Methods.delete);
