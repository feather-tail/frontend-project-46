#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(getDiff(filepath1, filepath2, options.format));
  });

program.parse(process.argv);
