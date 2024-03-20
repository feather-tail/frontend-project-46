import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseFile from './parser.js';
import format from '../formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFormat = (filename) => path.extname(filename).slice(1);

const findDifferences = (objOne, objTwo) => {
  const keysFirst = Object.keys(objOne);
  const keysSecond = Object.keys(objTwo);

  const allKeys = _.sortBy(_.union(keysFirst, keysSecond));

  return allKeys.map((key) => {
    if (!_.has(objOne, key)) {
      return { key, value: objTwo[key], type: 'added' };
    } if (!_.has(objTwo, key)) {
      return { key, value: objOne[key], type: 'deleted' };
    } if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      return { key, type: 'nested', children: findDifferences(objOne[key], objTwo[key]) };
    } if (!_.isEqual(objOne[key], objTwo[key])) {
      return {
        key, valueBefore: objOne[key], valueAfter: objTwo[key], type: 'changed',
      };
    }
    return { key, value: objOne[key], type: 'unchanged' };
  });
};

const getDiff = (file1, file2, formatName = 'stylish') => {
  const fileOne = readFile(file1);
  const fileTwo = readFile(file2);
  const parsedDataFirst = parseFile(fileOne, getFormat(file1));
  const parsedDataSecond = parseFile(fileTwo, getFormat(file2));
  const differ = findDifferences(parsedDataFirst, parsedDataSecond);
  return format(differ, formatName);
};

export default getDiff;
