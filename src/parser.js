import yaml from 'js-yaml';
import { getFormat, readFile } from './index.js';

const parseFile = (filename) => {
  switch (getFormat(filename)) {
    case 'json':
      return JSON.parse(readFile(filename));
    case 'yml':
      return yaml.load(readFile(filename));
    default:
      throw new Error('This format is not supported');
  }
};

export default parseFile;
