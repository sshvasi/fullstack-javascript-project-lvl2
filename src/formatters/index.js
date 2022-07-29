import stylish from './stylish.js';

export default (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unexpected output format ${format}`);
  }
};
