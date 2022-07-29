import { createPath, readFile } from '../src/files.js';
import genDiff from '../index.js';

const getFixturePath = (filename) => createPath(['__fixtures__', filename]);

const formats = ['stylish', 'plain'];
const extensions = ['json', 'yml'];
const expectedDiffs = new Map();

const combinations = extensions.flatMap(
  (extension) => formats.map((format) => [extension, format]),
);

beforeAll(() => {
  formats.forEach((format) => {
    const content = readFile(getFixturePath(`expected-${format}.txt`));
    expectedDiffs.set(format, content.trim());
  });
});

test.each(combinations)('diff .%s-file formatted as %s', (extension, format) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  const actual = genDiff(filepath1, filepath2, format);
  const expected = expectedDiffs.get(format);

  expect(actual).toStrictEqual(expected);
});
