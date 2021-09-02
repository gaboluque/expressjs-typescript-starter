import mongoose from 'mongoose';
import msg from '../../../utils/msg';
import userContextSchema from './userContextSchema';
import { IUser } from '../users.types';
import { LooseObject } from '../../../lib/commonTypes';

const userSchemaFields: Record<keyof Omit<IUser, '_id' | 'id'>, LooseObject> = {
  email: {
    type: String,
    required: msg.REQUIRED_EMAIL,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, msg.INVALID_EMAIL],
  },
  password: {
    type: String,
    required: msg.REQUIRED_PASSWORD,
    minlength: [7, msg.PASSWORD_MIN_LENGTH_7],
    trim: true,
  },
  name: {
    type: String,
    required: msg.USER_REQUIRED_NAME,
    trim: true,
    minlength: [2, 'userNameMinLength2'],
    maxlength: [30, 'userNameMaxLength30'],
  },
  userContext: userContextSchema,
};

const userSchema = new mongoose.Schema(userSchemaFields, {
  _id: true,
  timestamps: true,
});

export default userSchema;
