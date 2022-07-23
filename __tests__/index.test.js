import { createPath } from '../src/files.js';
import genDiff from '../index.js';

const getFixturePath = (filename) => createPath(['__fixtures__', filename]);

const expected = getFixturePath('expected.txt');

describe('compare nested json files', () => {
  test('positive scenario', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    const received = genDiff(filePath1, filePath2);

    expect(received).toStrictEqual(expected);
  });
});

describe('compare nested yaml files', () => {
  test('positive scenario', () => {
    const filePath1 = getFixturePath('file1.yml');
    const filePath2 = getFixturePath('file2.yml');

    const received = genDiff(filePath1, filePath2);

    expect(received).toStrictEqual(expected);
  });
});
