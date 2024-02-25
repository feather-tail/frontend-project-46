import yaml from 'js-yaml';
import { getFormat, readFile } from '.';

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

export { parseFile };