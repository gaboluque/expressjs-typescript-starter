import { IPagination, LooseObject } from '../../../lib/commonTypes';
import aggregateFetcher from '../../../utils/shared/utilServices/aggregateFetcher';
import { UserModel } from '../users.model';
import { simpleProjection } from '../../../utils/shared/aggegationHelpers';

const usersFetcherAggregation = (match: LooseObject) => [
  { $match: match },
  {
    $project: simpleProjection('_id name email'),
  },
];

const regexFields = ['name', 'email'];

export const usersFetcher = async ({ query, pagination }: IPagination) => {
  const match = { ...query };

  regexFields.forEach((f) => {
    if (match[f]) match[f] = new RegExp(match[f], 'i');
  });

  return aggregateFetcher(UserModel, pagination, usersFetcherAggregation(match));
};
