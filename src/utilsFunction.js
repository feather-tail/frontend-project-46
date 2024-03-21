import fs from 'fs';
import path, { dirname } from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');
const getFileFormat = (filename) => path.extname(filename).slice(1);

const findDifferences = (obj1, obj2) => {
  const keysFirst = Object.keys(obj1);
  const keysSecond = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keysFirst, keysSecond));

  return allKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: findDifferences(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, valueBefore: obj1[key], valueAfter: obj2[key], type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });
};

const __dirname = dirname(fileURLToPath(import.meta.url));

export {
  readFile, getFileFormat, findDifferences, __dirname,
};
