#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program.command('register')
  .description('Registers sundial application with the CLI!')
  .action(() => {
    sundial.register(program.args);
  });

program.command('run')
  .description('Pings monitor and runs cron job')
  .action(() => {
    sundial.run(program.args);
  });

program.command('discover')
  .description('Discover jobs to add endpoints to!')
  .option('-f, --full', 'Discover all jobs and monitors with one command!')
  .action((options) => {
    sundial.discover(options);
  });

program.command('update')
.description('Get updates to crontab!')
.action(sundial.update);

program.parse(process.argv);