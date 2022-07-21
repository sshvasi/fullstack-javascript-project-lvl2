import _ from 'lodash';

const createDiff = (obj1, obj2) => {
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
  });

  return diff;
};

export default createDiff;
