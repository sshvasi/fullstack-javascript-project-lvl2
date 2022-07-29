const JSONFormat = (diffTree) => JSON.stringify(diffTree, null, 2);

export default (diff) => JSONFormat(diff);
