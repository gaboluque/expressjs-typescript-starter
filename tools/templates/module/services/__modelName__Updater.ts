import { I__modelName__(pascalCase)UpdateDTO } from '../__modelName__(camelCase).types';
import { __modelName__(pascalCase)Repo } from '../__modelName__(camelCase).repo';

export const __modelName__(camelCase)Updater = (
  __modelName__Id: string,
  __modelName__DTO: I__modelName__(pascalCase)UpdateDTO
) => {
  return __modelName__Repo.updateById(__modelName__Id, __modelName__DTO);
};
