const formatDiff = (diff) => {
  const formattedDiff = diff
    .map((line) => `  ${line}`)
    .join('\n');

  return ['{', formattedDiff, '}'].join('\n');
};

export default formatDiff;
