// eslint-disable-next-line import/no-unresolved
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('common case JSON with stylish format', () => {
  const firstFileJSON = `${__dirname}/../__fixtures__/file1.json`;
  const secondFileJSON = `${__dirname}/../__fixtures__/file2.json`;
  const expectedDiffJSON = fs.readFileSync(
    `${__dirname}/../__tests__/expectedStylishResult.txt`,
    'utf-8',
  );
  expect(getDiff(firstFileJSON, secondFileJSON, 'stylish')).toEqual(expectedDiffJSON);
});

test('common case YML with stylish format', () => {
  const firstFileYML = `${__dirname}/../__fixtures__/file1.yml`;
  const secondFileYML = `${__dirname}/../__fixtures__/file2.yml`;
  const expectedDiffYML = fs.readFileSync(
    `${__dirname}/../__tests__/expectedStylishResult.txt`,
    'utf-8',
  );
  expect(getDiff(firstFileYML, secondFileYML, 'stylish')).toEqual(expectedDiffYML);
});

test('common case JSON with plain format', () => {
  const firstFileJSON = `${__dirname}/../__fixtures__/file1.json`;
  const secondFileJSON = `${__dirname}/../__fixtures__/file2.json`;
  const expectedDiffJSON = fs.readFileSync(
    `${__dirname}/../__tests__/expectedPlainResult.txt`,
    'utf-8',
  );
  expect(getDiff(firstFileJSON, secondFileJSON, 'plain')).toEqual(expectedDiffJSON);
});

test('common case YML with plain format', () => {
  const firstFileYML = `${__dirname}/../__fixtures__/file1.yml`;
  const secondFileYML = `${__dirname}/../__fixtures__/file2.yml`;
  const expectedDiffYML = fs.readFileSync(
    `${__dirname}/../__tests__/expectedPlainResult.txt`,
    'utf-8',
  );
  expect(getDiff(firstFileYML, secondFileYML, 'plain')).toEqual(expectedDiffYML);
});
