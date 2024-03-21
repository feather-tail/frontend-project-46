import fs from 'fs';
import getDiff from '../src/index.js';
import { __dirname } from '../src/utilsFunction.js';

const extensions = ['.json', '.yml'];

const expectedStylishDiff = fs.readFileSync(
  `${__dirname}/../__fixtures__/expectedStylishResult.txt`,
  'utf-8',
);
const expectedPlainDiff = fs.readFileSync(
  `${__dirname}/../__fixtures__/expectedPlainResult.txt`,
  'utf-8',
);

const expectedJSONDiff = fs.readFileSync(
  `${__dirname}/../__fixtures__/expectedJSONResult.txt`,
  'utf-8',
);

test.each(extensions)(`common case ${extensions} with stylish, plain and json formats`, (extension) => {
  const firstFile = `${__dirname}/../__fixtures__/file1${extension}`;
  const secondFile = `${__dirname}/../__fixtures__/file2${extension}`;
  const case1 = getDiff(firstFile, secondFile, 'stylish');
  expect(case1).toEqual(expectedStylishDiff);
  const case2 = getDiff(firstFile, secondFile, 'plain');
  expect(case2).toEqual(expectedPlainDiff);
  const case3 = getDiff(firstFile, secondFile, 'json');
  expect(case3).toEqual(expectedJSONDiff);
});
