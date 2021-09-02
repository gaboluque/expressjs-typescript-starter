import dotenv from 'dotenv';
import { nodeEnv } from '../../../config';

dotenv.config();

type Envs = 'development' | 'test' | 'production' | 'staging';
const env: Envs = nodeEnv as Envs;

const envPaths = {
  development: 'src/resources/mail',
  test: 'src/resources/mail',
  production: 'bluu-server/dist/resources/mail',
  staging: 'bluu-server/dist/resources/mail',
};

const layoutsDir = `${envPaths[env] || envPaths['production']}/views`;
const partialsDir = `${envPaths[env] || envPaths['production']}/partials`;

export default {
  viewEngine: {
    extname: '.hbs',
    layoutsDir,
    partialsDir,
  },
  viewPath: layoutsDir,
  extName: '.hbs',
};
