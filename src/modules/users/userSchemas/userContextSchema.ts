import mongoose from 'mongoose';
import { IUserContext } from '../users.types';
import { LooseObject } from '../../../lib/commonTypes';

const userContextSchemaFields: Record<keyof IUserContext, LooseObject> = {
  confirmationToken: {
    type: String,
  },
  notificationToken: {
    type: String,
  },
  confirmedAt: {
    type: Date,
  },
  confirmationSentAt: {
    type: Date,
  },
  restorePasswordToken: {
    type: String,
  },
  restorePasswordSentAt: {
    type: Date,
  },
};

const userContextSchema = new mongoose.Schema(userContextSchemaFields, {
  _id: false,
});

export default userContextSchema;
