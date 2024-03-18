const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const renderPlain = (diff, path = '') => {
  const result = diff.flatMap((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key;
    switch (item.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`;
      case 'nested':
        return renderPlain(item.children, currentPath);
      default:
        return [];
    }
  });
  return result.join('\n');
};

export default renderPlain;
