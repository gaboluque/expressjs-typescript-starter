import aggregateFetcher from '../../../utils/shared/utilServices/aggregateFetcher';
import { __modelName__(pascalCase)Model } from '../__modelName__(camelCase).model';
import { IPagination, LooseObject } from '../../../utils/commonTypes';
import __modelName__FetcherAggregation from '../aggregations/__modelName__(camelCase)FetcherAggregation';

export const __modelName__(camelCase)sFetcher = ({ query, pagination }: IPagination) => {
  const match: LooseObject = {
    ...query,
  };

  return aggregateFetcher(__modelName__(pascalCase)Model, pagination, __modelName__FetcherAggregation(match));
};
