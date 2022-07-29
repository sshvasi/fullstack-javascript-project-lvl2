import _ from 'lodash';
import types from '../types.js';

const formatNodeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const formatNode = (node, path) => {
  const {
    key, type, value, prevValue, children 
  } = node;
  const currentPath = [...path, key].join('.');

  switch (type) {
    case types.added:
      return `Property '${currentPath}' was added with value: ${formatNodeValue(value)}`;

    case types.deleted:
      return `Property '${currentPath}' was removed`;

    case types.changed:
      return `Property '${currentPath}' was updated. From ${formatNodeValue(prevValue)} to ${formatNodeValue(value)}`;

    case types.nested:
      return children.flatMap((child) => formatNode(child, [...path, key]));

    case types.unchanged:
      return '';

    default:
      throw new Error(`Unexpected node type: ${type}.`);
  }
};

const plainFormat = (diffTree) => diffTree
  .flatMap((node) => formatNode(node, []))
  .filter((node) => node);

export default (diff) => plainFormat(diff).join('\n');
