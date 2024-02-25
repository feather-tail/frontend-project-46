import fs from 'fs';
import path from 'path';
const process = require('process');
import parseFile from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

export { getAbsolutePath, readFile, getFormat };