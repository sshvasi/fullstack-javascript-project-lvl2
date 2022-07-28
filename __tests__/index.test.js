import { createPath, readFile } from '../src/files.js';
import genDiff from '../index.js';

const getFixturePath = (filename) => createPath(['__fixtures__', filename]);


describe('compare nested json files', () => {
  test('positive scenario', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

    const expected = readFile(getFixturePath('expected.txt'));
    const received = genDiff(filePath1, filePath2);

    expect(received).toStrictEqual(expected);
  });
});

describe('compare nested yaml files', () => {
  test('positive scenario', () => {
    const filePath1 = getFixturePath('file1.yml');
    const filePath2 = getFixturePath('file2.yml');

    const expected = readFile(getFixturePath('expected.txt'));
    const received = genDiff(filePath1, filePath2);

    expect(received).toStrictEqual(expected);
  });
});
