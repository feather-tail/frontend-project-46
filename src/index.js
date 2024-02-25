import fs from 'fs';
import path from 'path';
const process = require('process');
import parseFile from './parser.js';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const gettingDifferences = () => {
  const keysFirst = Object.keys(objectOne);
  const keysSecond = Object.keys(objectTwo);

  const sortedKeys = _.sortBy([...keysFirst, ...keysSecond]);
};

const getDiff = (objectOne, objectTwo) => {
  const dataFirst = readFile(objectOne);
  const dataSecond = readFile(objectTwo);

  const parsedDataFirst = parseFile(dataFirst);
  const parsedDataSecond = parseFile(dataSecond);

  const resultData = gettingDifferences(parsedDataFirst, parsedDataSecond);
  return resultData;
};

export { getAbsolutePath, readFile, getFormat, getDiff };