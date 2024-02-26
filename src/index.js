import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath, 'utf-8'));
const getFormat = (filename) => path.extname(filename).slice(1);

const parseFile = (filename) => {
  switch(getFormat(filename)) {
    case 'json':
      return JSON.parse(readFile(filename));
    case 'yaml':
      return yaml.load(readFile(filename));
    default:
      throw new Error('This format is not supported');
  }
};

const gettingDifferences = (objOne, objTwo) => {
  const keysFirst = Object.keys(objOne);
  const keysSecond = Object.keys(objTwo);

  const sortedKeys = _.sortBy(_.union(keysFirst, keysSecond));

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

const getDiff = (file1, file2) => {
  const parsedDataFirst = parseFile(file1);
  const parsedDataSecond = parseFile(file2);

  const resultData = gettingDifferences(parsedDataFirst, parsedDataSecond);
  return resultData;
};

export { getAbsolutePath, readFile, getFormat, gettingDifferences, getDiff };
