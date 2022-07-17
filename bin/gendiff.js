#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

const VERSION = '1.0.0';
const DESCRIPTION = 'Compares two configuration files and shows a difference.';

program
  .name('gendiff')
  .description(DESCRIPTION)
  .version(VERSION)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

program.parse(process.argv);
