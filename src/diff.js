import _ from 'lodash';
import types from './types.js';

const createDiff = (obj1, obj2) => {
  
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedUnitedKeys = _.sortBy(unitedKeys);

  const diff = [];

  sortedUnitedKeys.forEach((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!_.has(obj1, key)) {
      diff.push(`${types.added} ${key}: ${val2}`);
    } else  if (!_.has(obj2, key)) {
      diff.push(`${types.deleted} ${key}: ${val1}`);
    } else if (val1 === val2) {
      diff.push(`${types.unchanged} ${key}: ${val1}`);
    } else {
      diff.push(`${types.deleted} ${key}: ${val1}`);
      diff.push(`${types.added} ${key}: ${val2}`);
    }
  });

  return diff;
};

export default createDiff;
