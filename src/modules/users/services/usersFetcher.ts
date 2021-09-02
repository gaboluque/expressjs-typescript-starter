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
  if (match.name) match.name = new RegExp(match.name, 'i');
  if (match.email) match.email = new RegExp(match.email, 'i');

  console.log(match);

  return aggregateFetcher(UserModel, pagination, usersFetcherAggregation(match));
};
