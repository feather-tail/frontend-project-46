#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filename1, filename2, options) => {
    console.log(getDiff(filename1, filename2, options.format));
  });

program.parse(process.argv);
