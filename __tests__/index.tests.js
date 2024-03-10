// eslint-disable-next-line import/no-unresolved
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getDiff } from '../src/index.js';

test('common case', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const firstFileJSON = `${__dirname}/../__fixtures__/file1.json`;
  const secondFileJSON = `${__dirname}/../__fixtures__/file2.json`;
  const expectedDiffJSON = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getDiff(firstFileJSON, secondFileJSON)).toBe(expectedDiffJSON);

  const firstFileYML = `${__dirname}/../__fixtures__/file1.yml`;
  const secondFileYML = `${__dirname}/../__fixtures__/file2.yml`;
  const expectedDiffYML = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getDiff(firstFileYML, secondFileYML)).toBe(expectedDiffYML);

  const thirdFileJSON = `${__dirname}/../__fixtures__/file1.json`;
  const fourthFileJSON = `${__dirname}/../__fixtures__/file2.json`;
  const expectedDiffSecondJSON = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getDiff(thirdFileJSON, fourthFileJSON)).toBe(expectedDiffSecondJSON);
});
