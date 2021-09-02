import { LooseObject } from '../../../utils/commonTypes';

export default (match: LooseObject) => [{ $match: match }];
