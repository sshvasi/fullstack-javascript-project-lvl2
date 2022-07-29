import { readFile, getExtension } from './src/files.js';
import parseFile from './src/parsers.js';
import createDiff from './src/diff.js';
import formatDiff from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileExtension1 = getExtension(filepath1);
  const fileExtension2 = getExtension(filepath2);
 
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const obj1 = parseFile(fileContent1, fileExtension1);
  const obj2 = parseFile(fileContent2, fileExtension2);
 
  const diff = createDiff(obj1, obj2);

  const formattedDiff = formatDiff(diff, formatName);

  return formattedDiff;
};

export default genDiff;
