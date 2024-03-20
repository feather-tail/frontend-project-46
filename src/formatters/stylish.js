import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const makeIndent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) return value;
  const lines = Object.entries(value).map(([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n  ${makeIndent(depth)}}`;
};

const formatStylish = (value, depth = 1) => {
  const {
    type, key, valueBefore, valueAfter, children,
  } = value;
  const indent = makeIndent(depth);

  switch (type) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${indent}${symbols[type]} ${key}: ${stringify(value.value, depth)}`;
    case 'changed':
      return `${indent}${symbols.deleted} ${key}: ${stringify(valueBefore, depth)}\n${indent}${symbols.added} ${key}: ${stringify(valueAfter, depth)}`;
    case 'nested':
      return `${indent}${symbols.nested} ${key}: {\n${children.map((val) => formatStylish(val, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export default (differences) => `{\n${differences.map((value) => formatStylish(value)).join('\n')}\n}`;
