import { dbClose, dbConnect, removeAllCollections } from '../../utils';
import { userCreator } from '../../../src/modules/auth/services/userCreator';
import { IUser } from '../../../src/modules/users/users.types';
import { usersFetcher } from '../../../src/modules/users/services/usersFetcher';
import { validUserDTO } from '../../utils/userTestUtils';

describe('usersFetcher', () => {
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

  it('should fetch users correctly without params', async () => {
    const userDocs = await usersFetcher({});

    expect(userDocs.kind).toBe('userDocs');
    expect(userDocs.totalDocs).toBe(1);
    expect(userDocs.docs.length).toBe(1);
    expect(userDocs.hasNextPage).toBe(false);
  });

  it('should fetch users correctly with params', async () => {
    const userDocs = await usersFetcher({ query: { id: user.id } });

    expect(userDocs.kind).toBe('userDocs');
    expect(userDocs.totalDocs).toBe(1);
    expect(userDocs.docs.length).toBe(1);
    expect(userDocs.hasNextPage).toBe(false);
  });

  it('should fetch users correctly with partial name param', async () => {
    const userDocs = await usersFetcher({ query: { name: user.name.substr(3, 8) } });

    expect(userDocs.kind).toBe('userDocs');
    expect(userDocs.totalDocs).toBe(1);
    expect(userDocs.docs.length).toBe(1);
    expect(userDocs.hasNextPage).toBe(false);
  });

  it('should fetch users correctly with partial email param', async () => {
    const userDocs = await usersFetcher({ query: { email: user.email.substr(3, 8) } });

    expect(userDocs.kind).toBe('userDocs');
    expect(userDocs.totalDocs).toBe(1);
    expect(userDocs.docs.length).toBe(1);
    expect(userDocs.hasNextPage).toBe(false);
  });

  it('should fetch no users with incorrect params', async () => {
    const userDocs = await usersFetcher({ query: { id: 10 } });

    expect(userDocs.kind).toBe('userDocs');
    expect(userDocs.totalDocs).toBe(0);
    expect(userDocs.docs.length).toBe(0);
    expect(userDocs.hasNextPage).toBe(false);
  });
});
