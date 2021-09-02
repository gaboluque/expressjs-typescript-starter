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

export default async ({ query, pagination }: IPagination) => {
  const match = { ...query };
  return aggregateFetcher(UserModel, pagination, usersFetcherAggregation(match));
};
