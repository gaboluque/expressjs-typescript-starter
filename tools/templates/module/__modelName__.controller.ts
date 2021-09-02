import { Request, Response } from 'express';
import {
  Authorize,
  Controller,
  Get,
  HasPagination,
  Post,
  Put,
  Sanitize,
} from '../../lib/core/decorators';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';
import { paramIdValidator } from '../../utils/shared/validatorHelpers';
import {
  __modelName__(camelCase)Creator,
  __modelName__(camelCase)sFetcher,
  __modelName__(camelCase)Shower,
  __modelName__(camelCase)Updater,
} from './__modelName__(camelCase).services';
import {
  __modelName__(camelCase)CreateValidator,
  __modelName__(camelCase)UpdateValidator,
} from './__modelName__(camelCase).validators';

@Controller('/__modelName__(camelCase)')
export class AnnouncementsController {
  @Post('/')
  @Authorize([])
  @Sanitize(__modelName__(camelCase)CreateValidator)
  public async create({ permittedParams }: Request, res: Response) {
    const __modelName__(camelCase) = await __modelName__(camelCase)Creator(permittedParams);

    res
      .status(200)
      .send(responseFormatter(__modelName__(camelCase), '__modelName__(sentenceCase) creado correctamente'));
  }

  @Get('/:__modelName__Id')
  @Authorize([])
  @Sanitize(paramIdValidator('__modelName__Id'))
  public async show({ permittedParams }: Request, res: Response) {
    const __modelName__(camelCase) = await __modelName__(camelCase)Shower(permittedParams.productId);

    res.status(200).send(responseFormatter(__modelName__(camelCase)));
  }

  @Put('/:__modelName__Id')
  @Authorize([])
  @Sanitize(paramIdValidator('__modelName__Id'))
  @Sanitize(__modelName__(camelCase)UpdateValidator)
  public async update({ permittedParams }: Request, res: Response) {
    const __modelName__(camelCase) = await __modelName__(camelCase)Updater(
      permittedParams.__modelName__Id,
      permittedParams
    );
    res
      .status(200)
      .send(
        responseFormatter(__modelName__(camelCase), '__modelName__(sentenceCase) actualizado correctamente')
      );
  }

  @Get('/')
  @Authorize([])
  @HasPagination
  public async index({ permittedParams }: Request, res: Response) {
    const __modelName__(camelCase)s = __modelName__(camelCase)sFetcher(permittedParams);

    res.status(200).send(responseFormatter(__modelName__(camelCase)s));
  }
}
