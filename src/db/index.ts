/* eslint-disable no-console */
import mongoose from 'mongoose';
import { isProduction } from '../utils/commonUtils';
import { dbConf } from '../config';

export const connectDB = () => {
  if (!isProduction()) {
    mongoose.set('debug', true);
  }

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useFindAndModify', false);

  mongoose.connect(`${dbConf.host}/${dbConf.name}`, {}, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};
