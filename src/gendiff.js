import fs from 'fs';
import _ from 'lodash';
import { readFile } from './utils.js';

const makeDiffString = (obj1, obj2) => {
  const STATE_TYPES = {
    added: '+',
    deleted: '-',
    unchanged: ' ',
  };

  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedUnitedKeys = _.sortBy(unitedKeys);

  const diff = sortedUnitedKeys.map((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!_.has(obj1, key)) {
      return `  ${STATE_TYPES.added} ${key}: ${val2}`;
    }

    if (!_.has(obj2, key)) {
      return `  ${STATE_TYPES.deleted} ${key}: ${val1}`;
    }

    if (val1 === val2) {
      return `  ${STATE_TYPES.unchanged} ${key}: ${val1}`;
    }

    return [
      `  ${STATE_TYPES.deleted} ${key}: ${val1}`,
      `  ${STATE_TYPES.added} ${key}: ${val2}`,
    ].join('\n');
  }).join('\n');

  return diff;
};

const genDiff = (filepath1, filepath2) => {
  const contentFile1 = readFile(filepath1);
  const contentFile2 = readFile(filepath2);

  const obj1 = JSON.parse(contentFile1);
  const obj2 = JSON.parse(contentFile2);
  
  const diff = makeDiffString(obj1, obj2);

  return diff;
};

export default genDiff;
