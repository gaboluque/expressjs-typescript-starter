import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import { userCreator } from '../../../src/modules/auth/services/userCreator';
import { IUser } from '../../../src/modules/users/users.types';
import { validUserDTO } from '../../utils/userTestUtils';
import { userUpdater } from '../../../src/modules/users/services/userUpdater';

const validUpdateDTO = {
  name: 'New Awesome Name',
  password: 'ThisIsSecretTho',
};

describe('userUpdater', () => {
  let user: IUser;

  beforeAll(async () => {
    await dbConnect();
    await removeAllCollections();
  });

  beforeEach(async () => {
    await removeAllCollections();
    user = await userCreator(validUserDTO);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should update user correctly with valid DTO', async () => {
    const newUser = await userUpdater(validUpdateDTO, user._id);

    expect(newUser.name).toBe(validUpdateDTO.name);
    expect(newUser.email).toBe(user.email);
  });

  it("should not update user's email ", async () => {
    const newUser = await userUpdater({ email: 'newEmail@email.com' }, user._id);

    expect(newUser.email).toBe(user.email);
  });

  it('should not add undesired items', async () => {
    // @ts-ignore
    const newUser = await userUpdater({ notWanted: 'IDontWantThis' }, user._id);

    // @ts-ignore
    expect(newUser.notWanted).not.toBeDefined();
  });
});
