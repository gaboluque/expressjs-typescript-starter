import { mongoId } from '../../commonUtils';

export default async (klass: any, id: string, aggregate: any[], own = {}) => {
  const aggregation = [{ $match: { _id: mongoId(id), ...own } }, ...aggregate];
  const result = await klass.aggregate(aggregation);
  return result[0];
};
