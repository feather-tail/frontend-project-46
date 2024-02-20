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

const getSortedFile = (filename) => _.sortBy(parseFile(filename));

export { parseFile, getSortedFile };