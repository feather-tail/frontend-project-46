import yaml from 'js-yaml';

const parseFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error('This format is not supported');
  }
};

export default parseFile;
