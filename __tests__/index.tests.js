// eslint-disable-next-line import/no-unresolved
import fs from 'fs';
import getDiff from '../src/index.js';
import { __dirname } from '../src/utilsFunction.js';

const extensions = ['.json', '.yml'];

const expectedStylishDiff = fs.readFileSync(
  `${__dirname}/../__tests__/expectedStylishResult.txt`,
  'utf-8',
);
const expectedPlainDiff = fs.readFileSync(
  `${__dirname}/../__tests__/expectedPlainResult.txt`,
  'utf-8',
);

extensions.forEach((extension) => {
  test(`common case ${extension} with stylish and plain formats`, () => {
    const firstFile = `${__dirname}/../__fixtures__/file1${extension}`;
    const secondFile = `${__dirname}/../__fixtures__/file2${extension}`;
    expect(getDiff(firstFile, secondFile, 'stylish')).toEqual(expectedStylishDiff);
    expect(getDiff(firstFile, secondFile, 'plain')).toEqual(expectedPlainDiff);
  });
});
