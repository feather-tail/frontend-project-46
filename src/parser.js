import yaml from 'js-yaml';
import { getFormat } from '.';
import _ from 'lodash';

const parseFile = (filename) => {
  switch(getFormat(filename)) {
    case 'json':
      return [JSON.parse(readFile(filename))];
    case 'yaml':
      return [yaml.load(readFile(filename))];
    default:
      throw new Error('This format is not supported');
  }
};

const getDiff = (objectOne, objectTwo) => {
  const keysOne = Object.keys(objectOne);
  const keysTwo = Object.keys(objectTwo);

  const concatenatedKeys = _sortBy([...keysOne, ...keysTwo]);

  const result = {};
  return result;
};

export { parseFile, getSortedFile };