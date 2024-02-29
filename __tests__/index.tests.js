// eslint-disable-next-line import/no-unresolved
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getDiff } from '../src/index.js';

test('common case', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const firstFile = `${__dirname}/../__fixtures__/file1.json`;
  const secondFile = `${__dirname}/../__fixtures__/file2.json`;
  const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(getDiff(firstFile, secondFile)).toBe(expectedDiff);
});
