import { createPath } from '../src/files.js';
import genDiff from '../index.js';

const getFixturePath = (filename) => createPath(['__fixtures__', filename]);

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');

test('gendiff jsons comparation is valid', () => {
  const expected = 
`  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true`;
  const received = genDiff(jsonFilePath1, jsonFilePath2);
  expect(received).toBe(expected);
});
