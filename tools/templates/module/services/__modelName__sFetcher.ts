import aggregateFetcher from '../../../utils/shared/utilServices/aggregateFetcher';
import { __modelName__(pascalCase)Model } from '../__modelName__(camelCase).model';
import { IPagination, LooseObject } from '../../../utils/commonTypes';

const __modelName__FetcherAggregation = (match: LooseObject) => [{ $match: match }]

export const __modelName__(camelCase)sFetcher = ({ query, pagination }: IPagination) => {
  const match: LooseObject = {
    ...query,
  };

  return aggregateFetcher(__modelName__(pascalCase)Model, pagination, __modelName__FetcherAggregation(match));
};
