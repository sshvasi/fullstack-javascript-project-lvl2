import stylish from './stylish.js';
import plain from './plain.js';

export default (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    default:
      throw new Error(`Unexpected output format ${formatName}`);
  }
};
