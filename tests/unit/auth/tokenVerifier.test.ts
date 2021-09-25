import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import { userCreator } from '../../../src/modules/auth/services/userCreator';
import { IUser } from '../../../src/modules/users/users.types';
import { validUserDTO } from '../../utils/userTestUtils';
import { sessionCreator } from '../../../src/modules/auth/services/sessionCreator';
import { tokenVerifier } from '../../../src/modules/auth/services/tokenVerifier';
import { tokenConfirmator } from '../../../src/modules/auth/services/tokenConfirmator';

describe('tokenVerifier', () => {
  let user: IUser;
  let auth: any;

  beforeAll(async () => {
    await dbConnect();
    await removeAllCollections();
  });

  beforeEach(async () => {
    await removeAllCollections();
    user = await userCreator(validUserDTO);
    await tokenConfirmator(user.userContext.confirmationToken!);
    auth = await sessionCreator(validUserDTO);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async (done) => {
    await dbClose();
    done();
  });

  // This service is used with the verify-token endpoint, which uses a middleware to verify if the token is reliable
  it('should return user session  correctly', async () => {
    const sessionData = await tokenVerifier(user, auth.token);

    expect(sessionData.token).toBe(auth.token);
    expect(sessionData.env).toBe('test');
    expect(sessionData._id).toBe(user._id);
    expect(sessionData.email).toBe(user.email);
    expect(sessionData.name).toBe(user.name);
    expect(JSON.stringify(sessionData.userContext)).toBe(JSON.stringify(user.userContext));
  });
});
