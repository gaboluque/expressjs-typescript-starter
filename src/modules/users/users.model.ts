import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import AutoIncrementFactory from 'mongoose-sequence';
import userSchema from './userSchemas/userSchema';
import { IUserDoc } from './users.types';

export const USER_MODEL_NAME = 'User';

// @ts-ignore
userSchema.plugin(AutoIncrementFactory(mongoose.connection), {
  id: 'user_ref',
  inc_field: 'ref',
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);

export const UserModel = mongoose.model<IUserDoc>(USER_MODEL_NAME, userSchema, 'users');
