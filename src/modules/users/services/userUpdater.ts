import { UsersRepo } from '../users.repo';
import { IUserDTO } from '../users.types';
import NotFoundError from '../../../complements/exceptions/NotFoundError';
import { leanUser } from '../users.methods';
import msg from '../../../utils/msg';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';

export default async (userDTO: IUserDTO, userId: string) => {
  const newDTO = { ...userDTO };
  if (newDTO.password) newDTO.password = await encryptionGenerator(newDTO.password);

  const user = await UsersRepo.updateById(userId, newDTO);
  if (!user) throw new NotFoundError(msg.USER_NOT_FOUND);
  return leanUser(user);
};
