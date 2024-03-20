import { readFile, getFileFormat, findDifferences } from './utilsFunction.js';
import parseFile from './parser.js';
import format from './formatters/index.js';

const getDiff = (file1, file2, formatName = 'stylish') => {
  const fileOne = readFile(file1);
  const fileTwo = readFile(file2);
  const parsedDataFirst = parseFile(fileOne, getFileFormat(file1));
  const parsedDataSecond = parseFile(fileTwo, getFileFormat(file2));
  const differences = findDifferences(parsedDataFirst, parsedDataSecond);
  return format(differences, formatName);
};

export default getDiff;
