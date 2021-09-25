/* eslint-disable no-console */
import app from './app';
import { serverConf } from './config';
import { connectDB } from '../setup/mongo';
import { setupClusters } from './clusters';

setupClusters(() => {
  // Connect to database
  connectDB();

  // Start server listening
  app.listen(Number(serverConf.port), '0.0.0.0', (): void => {
    console.log('Server running on port', serverConf.port);
  });
});
