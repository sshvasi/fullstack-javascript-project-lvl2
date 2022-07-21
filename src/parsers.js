import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);

const parseYAML = (data) => yaml.load(data);

const parseFile = (data) => {
  return parseJSON(data);
};

export default parseFile;
