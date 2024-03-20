import yaml from 'js-yaml';

const parseFile = (fileContent, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    default:
      throw new Error('This format is not supported');
  }
};

export default parseFile;
