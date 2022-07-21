import { readFile } from './src/files.js';
import parseFile from './src/parsers.js';
import createDiffTree from './src/tree.js';

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);

  const obj1 = parseFile(fileContent1);
  const obj2 = parseFile(fileContent2);
  
  const diff = createDiffTree(obj1, obj2);

  return diff;
};

export default genDiff;
