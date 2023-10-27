#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program.command('run')
  .description('Pings monitor and runs cron job')
  .action(() => {
    sundial.run(program);
  });

program.command('discover')
  .description('Discover jobs to add endpoints to!')
  .option('-f, --full', 'Discover all jobs and monitors with one command!')
  .action((options) => {
    sundial.discover(options);
  });

program.parse(process.argv);