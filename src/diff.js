import _ from 'lodash';
import types from './types.js';

const createDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return {
        key,
        type: types.added,
        value: value2,
      };
    }

    if (!_.has(obj2, key)) {
      return {
        key,
        type: types.deleted,
        value: value1,
      };
    }

    if (value1 === value2) {
      return {
        key,
        type: types.unchanged,
        value: value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        type: types.nested,
        children: createDiffTree(value1, value2),
      };
    }

    return {
      key,
      type: types.changed,
      prevValue: value1,
      value: value2,
    };
  });
};

export default createDiffTree;
