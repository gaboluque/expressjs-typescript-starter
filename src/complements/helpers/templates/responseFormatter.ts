import { LooseObject } from '../../../lib/commonTypes';

export interface IResponseResult extends LooseObject {
  info?: {
    message: string;
    type: string;
  };
}

export default (data: any = undefined, message: string | undefined = undefined) => {
  let result: IResponseResult = {};
  if (message) result.info = { message, type: 'success' };
  if (data) result = { ...result, ...data };
  return result;
};
