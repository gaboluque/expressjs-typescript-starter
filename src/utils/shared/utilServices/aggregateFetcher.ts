import pageTemplate from '../../../complements/helpers/templates/pageTemplate';
import { IPagination, LooseObject } from '../../../lib/commonTypes';

type QuasiAny = LooseObject | string | number;

const isNumeric = (str: string) => !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
const stringToNum = (str: string) => (isNumeric(str) ? parseInt(str, 10) : str);

// TODO: I Think we can do this cleaner
const convertIntObj = (obj: QuasiAny): QuasiAny => {
  if (typeof obj === 'number') return obj;
  if (obj instanceof RegExp) return obj;
  if (typeof obj === 'string') return stringToNum(obj);
  if (obj && obj._bsontype) return obj;
  if (Array.isArray(obj)) return obj.map(convertIntObj);
  return Object.entries(obj).reduce((o, [key, value]) => {
    let newVal = value;
    if (Array.isArray(newVal)) newVal = newVal.map(convertIntObj);
    // Check if its object AND if its not a mongoID
    else if (typeof newVal === 'object' && !newVal._bsontype) newVal = convertIntObj(newVal);
    else if (typeof newVal === 'string') newVal = stringToNum(newVal);
    return {
      ...o,
      [key]: newVal,
    };
  }, {});
};

const defaultPagination: IPagination['pagination'] = { page: 1, limit: 20, sort: {} };

export default async (
  klass: any,
  pagination: IPagination['pagination'] = defaultPagination,
  aggregate = [{}],
  asKlass = null
) => {
  const newPagination = {
    page: pagination.page,
    limit: pagination.limit,
    sort: {
      createdAt: -1,
      ...pagination.sort,
    },
  };

  const pageData = await klass.aggregatePaginate(
    klass.aggregate(aggregate.map(convertIntObj)),
    newPagination
  );
  const klassName = asKlass || klass.modelName.toLowerCase();
  return pageTemplate(`${klassName}Docs`, pageData);
};
