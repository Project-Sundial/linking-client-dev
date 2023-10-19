#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program.command('command1')
  .description('Description of command1')
  .action(() => {
    console.log(sundial.command1);
    sundial.command1(program); // Pass the program object to sundial.command1
  });

program.command('command2')
  .description('Description of command2')
  .action(sundial.command2);

program.parse(process.argv);