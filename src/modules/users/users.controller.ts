import { Response, Request } from 'express';
import {
  Controller,
  Sanitize,
  Get,
  Put,
  HasPagination,
  Authenticate,
} from '../../lib/core/decorators';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';
import { userOwnUpdateValidator } from './users.validators';
import msg from '../../utils/msg';
import usersFetcher from './services/usersFetcher';
import userUpdater from './services/userUpdater';

@Controller('/users')
export class UsersController {
  @Get('/')
  @Authenticate
  @HasPagination
  public async index({ permittedParams }: Request, res: Response) {
    const users = await usersFetcher(permittedParams!);
    res.status(200).send(responseFormatter(users));
  }

  @Put('/me')
  @Authenticate
  @Sanitize(userOwnUpdateValidator)
  public async updateOwnData({ permittedParams, currentUser }: Request, res: Response) {
    const user = await userUpdater(permittedParams, currentUser._id);
    res.status(200).send(responseFormatter(user, msg.UPDATE_USER_OWN_DATA_SUCCESS));
  }
}
