import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath, 'utf-8'));
const getFormat = (filename) => path.extname(filename).slice(1);

/*
const gettingDifferences = (objOne, objTwo) => {
  const keysFirst = Object.keys(objOne);
  const keysSecond = Object.keys(objTwo);

  const allKeys = _.sortBy(_.union(keysFirst, keysSecond));

  const diff = allKeys.reduce((acc, key) => {
    if (!(key in objOne)) {
      acc[key] = {
        key,
        value: objTwo[key],
        type: 'added',
      };
    } else if (!(key in objTwo)) {
      acc[key] = {
        key,
        value: objOne[key],
        type: 'deleted',
      };
    } else if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      acc[key] = {
        key,
        type: 'nested',
        children: gettingDifferences(objOne[key], objTwo[key]),
      };
    } else if (objOne[key] !== objTwo[key]) {
      acc[key] = {
        key,
        valueBefore: objOne[key],
        valueAfter: objTwo[key],
        type: 'changed',
      };
    } else {
      acc[key] = {
        key,
        value: objOne[key],
        type: 'unchanged',
      };
    }
    return acc;
  }, {});

  return diff;
};
*/

const getDiff = (file1, file2) => {
  const fileOne = readFile(file1);
  const fileTwo = readFile(file2);
  const parsedDataFirst = parseFile(fileOne, getFormat(file1));
  const parsedDataSecond = parseFile(fileTwo, (file2));
  const resultData = gettingDifferences(parsedDataFirst, parsedDataSecond);
  return resultData;
};

export default getDiff;
