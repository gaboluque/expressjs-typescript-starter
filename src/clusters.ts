import cluster from 'cluster';
import os from 'os';
import logHandler from './complements/subscribers/logSubscriber';

export const setupClusters = (workerFn: any) => {
  if (cluster.isMaster) {
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logHandler.emit('error', `Worker ${worker.process.pid} died`);

      cluster.fork();
    });
  } else {
    workerFn();
    logHandler.emit('info', `Worker ${process.pid} started`);
  }
};
