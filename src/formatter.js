const formatDiff = (diff) => {
  const formattedDiff = diff.join('\n');

  return ['{', formattedDiff, '}'].join('\n');
};

export default formatDiff;
