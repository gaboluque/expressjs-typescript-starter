import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import { userCreator } from '../../../src/modules/auth/services/userCreator';
import { invalidUserDTO, validUserDTO } from '../../utils/userTestUtils';
import msg from '../../../src/utils/msg';
import { UsersRepo } from '../../../src/modules/users/users.repo';
import { ee, events } from '../../../src/lib/core/EventEmitter';

describe('userCreator', () => {
  beforeAll(async () => {
    await dbConnect();
    await removeAllCollections();
  });

  beforeEach(async () => {
    await removeAllCollections();
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  it('should create user with valid DTO', async () => {
    const user = await userCreator(validUserDTO);
    expect(user.name).toBe(validUserDTO.name);
    expect(user.email).toBe(validUserDTO.email);
    expect(user.userContext).toHaveProperty('confirmationToken');
  });

  it('should call sign up event', async () => {
    const mockFn = jest.fn();
    ee.on(events.USER_SIGN_UP_EVENT, mockFn);
    await userCreator(validUserDTO);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should NOT create user with invalid DTO', async () => {
    await expect(userCreator(invalidUserDTO)).rejects.toThrow(msg.INVALID_EMAIL);
    const users = await UsersRepo.find({});
    expect(users.length).toBe(0);
  });

  it('should NOT call sign up event on invalid DTO', async () => {
    const mockFn = jest.fn();
    ee.on(events.USER_SIGN_UP_EVENT, mockFn);
    await expect(userCreator(invalidUserDTO)).rejects.toThrow(msg.INVALID_EMAIL);

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
