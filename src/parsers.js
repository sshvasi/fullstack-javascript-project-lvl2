import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);

const parseYAML = (data) => yaml.load(data);

const parseFile = (data, extension) => {
  switch (extension) {
    case 'json':
      return parseJSON(data);
    case 'yml':
    case 'yaml':
      return parseYAML(data);
    default:
      throw new Error(`Unexpected file extension ${extension}`);
  }
};

export default parseFile;
