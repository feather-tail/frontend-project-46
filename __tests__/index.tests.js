// eslint-disable-next-line import/no-unresolved
import getDiff from '../src/index.js';

test('common case', () => {
  expect(getDiff(file1, file2)).toStrictEqual([
    {
      follow: false,
      host: 'hexlet.io',
      timeout: 20,
      verbose: true,
    },
  ]);
});
