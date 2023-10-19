#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program.command('exec')
  .description('Pings monitor and runs cron job')
  .action(() => {
    console.log(sundial.command1);
    sundial.exec(program); // Pass the program object to sundial.command1
  });

program.command('command2')
  .description('Description of command2')
  .action(sundial.command2);

program.parse(process.argv);