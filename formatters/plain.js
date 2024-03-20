import _ from 'lodash';

const formatPlain = (diff) => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const iter = (data, path = '') => data
    .map((item) => {
      const currentPath = path ? `${path}.${item.key}` : item.key;
      switch (item.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`;
        case 'nested':
          return iter(item.children, currentPath);
        default:
          return null;
      }
    })
    .filter((line) => line !== null)
    .join('\n');

  return iter(diff);
};

export default formatPlain;
