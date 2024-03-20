import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (differences, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(differences);
    case 'plain':
      return formatPlain(differences);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
