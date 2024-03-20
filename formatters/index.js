import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const format = (differences, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(differences);
    case 'plain':
      return formatPlain(differences);
    case 'json':
      return formatJSON(differences);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
