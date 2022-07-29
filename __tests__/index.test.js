import { createPath, readFile } from '../src/files.js';
import genDiff from '../index.js';

const getFixturePath = (filename) => createPath(['__fixtures__', filename]);

const supportedOutputFormats = ['stylish', 'plain', 'json'];
const supportedExtensions = ['json', 'yml'];

const getCombinations = (formats, extensions) => {
  const extCombinations = extensions
    .flatMap((extension1) => extensions.map((extension2) => [extension1, extension2]));

  return extCombinations
    .flatMap((extComb) => formats.map((format) => [...extComb, format]));
};

const combinations = getCombinations(supportedOutputFormats, supportedExtensions);

const expectedDiffs = new Map();

beforeAll(() => {
  supportedOutputFormats.forEach((format) => {
    const content = readFile(getFixturePath(`expected-${format}.txt`));
    expectedDiffs.set(format, content.trim());
  });
});

test.each(combinations)(
  '(.%s .%s)-files diff formatted as %s',
  (extension1, extension2, format) => {
    const filepath1 = getFixturePath(`file1.${extension1}`);
    const filepath2 = getFixturePath(`file2.${extension2}`);

    const actual = genDiff(filepath1, filepath2, format);
    const expected = expectedDiffs.get(format);

    expect(actual).toStrictEqual(expected);
  }
);
