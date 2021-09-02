import fs from 'fs';
import moment from 'moment';
import path from 'path';

const timeStamp = () => moment().format('DDMMYYYY_hhmmss');

const randomNum = (min = 0, max = 100) => {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};
const testFile = fs.readFileSync(path.resolve(__dirname, './resources/1.jpg'));

export { timeStamp, testFile, randomNum };
