import fs from 'fs';
import path from 'path';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (fileOne, fileTwo) => {
  const contentOne = readFile(fileOne);
  const contentTwo = readFile(fileTwo);
};

export default genDiff;