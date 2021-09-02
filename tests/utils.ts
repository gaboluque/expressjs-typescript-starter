import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import SuperError from '../src/complements/exceptions/SuperError';

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  // eslint-disable-next-line no-restricted-syntax
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
};

const dbConnect = async (db = 'test') => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.set('useFindAndModify', false);
  await mongoose.connect(`mongodb://127.0.0.1:27017/${db}`, {}, async (err) => {
    if (db === 'test') await removeAllCollections();
    if (err) {
      throw new SuperError(err.message, 500, 'error');
    }
  });
};

const testApp = request(app);

const dbClose = async () => {
  await removeAllCollections();
  await mongoose.connection.close();
};

export { dbConnect, dbClose, removeAllCollections, testApp };
