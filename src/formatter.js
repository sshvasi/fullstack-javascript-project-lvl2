import _ from 'lodash';
import types from './types.js';

const indentSize = 4;
const placeholder = ' ';

const getNodeMarker = (type) => {
  switch (type) {
    case types.added:
      return '+';
    case types.deleted:
      return '-';
    default:
      return placeholder;
  }
};

const createIndent = (depth) => {
  const reservedSpaceForMarker = 2;
  return placeholder.repeat((indentSize * depth) - reservedSpaceForMarker);
};

const formatNodeValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indent = createIndent(depth);

  const props = Object
    .keys(value)
    .map((key) => `${indent}${placeholder} ${key}: ${formatNodeValue(value[key], depth + 1)}`)
    .join('\n');

  return `{\n${props}\n${createIndent(depth - 1)}  }`;
};

const formatNode = (node, depth) => {
  const {
    key, type, value, prevValue, children,
  } = node;
  const indent = createIndent(depth);
  const marker = getNodeMarker(type);

  switch (type) {
    case types.added:
    case types.deleted:
    case types.unchanged:
      return `${indent}${marker} ${key}: ${formatNodeValue(value, depth + 1)}`;

    case types.changed: {
      const deletedMarker = getNodeMarker(types.deleted);
      const addedMarker = getNodeMarker(types.added);

      return [
        `${indent}${deletedMarker} ${key}: ${formatNodeValue(prevValue, depth + 1)}`,
        `${indent}${addedMarker} ${key}: ${formatNodeValue(value, depth + 1)}`,
      ].join('\n');
    }
    case types.nested: {
      const formattedSubNodes = children
        .map((subNode) => formatNode(subNode, depth + 1))
        .join('\n');

      return `${indent}${marker} ${key}: {\n${formattedSubNodes}\n${createIndent(depth)}  }`;
    }
    default:
      throw new Error(`Unexpected node type: ${type}.`);
  }
};

const stylishFormat = (diffTree) => {
  const lines = diffTree.map((node) => formatNode(node, 1));

  return ['{', ...lines, '}'];
};

export default (diff) => stylishFormat(diff).join('\n');
