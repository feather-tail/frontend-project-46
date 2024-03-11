import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath, 'utf-8'));
const getFormat = (filename) => path.extname(filename).slice(1);

const gettingDifferences = (objOne, objTwo) => {
  const keysFirst = Object.keys(objOne);
  const keysSecond = Object.keys(objTwo);

  const allKeys = _.sortBy(_.union(keysFirst, keysSecond));

  const diff = allKeys.reduce((acc, key) => {
    if (!(key in objOne)) {
      acc[`${key}`] = objTwo[key];
    } else if (!(key in objTwo)) {
      acc[`${key}`] = objOne[key];
    } else if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      acc[key] = gettingDifferences(objOne[key], objTwo[key]);
    } else if (objOne[key] !== objTwo[key]) {
      acc[`${key}`] = objOne[key];
      acc[`${key}`] = objTwo[key];
    } else {
      acc[`${key}`] = objOne[key];
    }
    return acc;
  }, {});

  return diff;
};

const getDiff = (file1, file2) => {
  const parsedDataFirst = parseFile(file1);
  const parsedDataSecond = parseFile(file2);

  const resultData = gettingDifferences(parsedDataFirst, parsedDataSecond);
  return resultData;
};

export {
  getAbsolutePath, readFile, getFormat, gettingDifferences, getDiff,
};
