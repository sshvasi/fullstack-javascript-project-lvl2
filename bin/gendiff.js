#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

const VERSION = '1.0.0';
const DESCRIPTION = 'Compares two configuration files and shows a difference.';

program
  .name('gendiff')
  .description(DESCRIPTION)
  .version(VERSION)
  .arguments('<filepath1> <filepath2>', 'stylish')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  });

program.parse(process.argv);
