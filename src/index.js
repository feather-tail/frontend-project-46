import fs from 'fs';
import path from 'path';
const process = require('process');
import parseFile from './parser.js';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const gettingDifferences = (objOne, objTwo) => {
  const keysFirst = Object.keys(objOne);
  const keysSecond = Object.keys(objTwo);

  const sortedKeys = _.sortBy([...keysFirst, ...keysSecond]);

  const showDiff = sortedKeys.map((key) => {
    if (!(key in objOne)) {
      return { key: key, value: objTwo[key], type: 'added' };
    }
    if (!(key in objTwo)) {
      return { key: key, value: objOne[key], type: 'removed' };
    }
    if (objOne[key] !== objTwo[key]) {
      return { key: key, valueBefore: objOne[key], valueAfter: objTwo[key], type: 'changed' };
    }
    return { key: key, value: objOne[key], type: 'unchanged' };
  });

  return showDiff;
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