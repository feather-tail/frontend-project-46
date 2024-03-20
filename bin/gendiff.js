#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filename1, filename2, options) => {
    const file1Path = path.resolve(process.cwd(), '__fixtures__', filename1);
    const file2Path = path.resolve(process.cwd(), '__fixtures__', filename2);
    console.log(getDiff(file1Path, file2Path, options.format));
  });

program.parse(process.argv);
