import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import AutoIncrementFactory from 'mongoose-sequence';
import mongoosePaginate from 'mongoose-paginate-v2';
import { __modelName__(camelCase)sSchema } from './__modelName__(camelCase)Schemas/__modelName__(camelCase).schema';
import { I__modelName__(pascalCase)Doc } from './__modelName__(camelCase).types';

// @ts-ignore
__modelName__(camelCase)sSchema.plugin(AutoIncrementFactory(mongoose.connection), {
  id: '__modelName__(camelCase)ref',
  inc_field: 'id',
});

__modelName__(camelCase)sSchema.plugin(mongoosePaginate);
__modelName__(camelCase)sSchema.plugin(aggregatePaginate);

export const __modelName__(constantCase)ModelName = '__modelName__(camelCase)';

export const __modelName__(pascalCase)Model = mongoose.model<I__modelName__(pascalCase)Doc>(
    __modelName__(constantCase)ModelName,
    __modelName__(camelCase)sSchema,
  '__modelName__(camelCase)s'
);
