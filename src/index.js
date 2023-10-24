#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program.command('run')
  .description('Pings monitor and runs cron job')
  .action(() => {
    sundial.run(program); // Pass the program object to sundial.command1
  });

program.command('discover')
  .description('Discover jobs to add endpoints to!')
  .action(sundial.discover);

program.parse(process.argv);