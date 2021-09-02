import { UsersRepo } from '../../users/users.repo';

export const userContextCreator = async () => {
  const confirmationToken = await UsersRepo.tokenGenerator('confirmationToken');

  return { confirmationToken };
};
