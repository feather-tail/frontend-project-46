import yaml from 'js-yaml';

const parser = (file) => {
switch(getFormat(file)) {
  case 'json':
    return JSON.parse(readFile(file));
  case 'yaml':
    return yaml.load(readFile(file));
  default:
    throw new Error('This format is not supported');
}
};

export default parser;