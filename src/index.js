#!/usr/bin/env node

import { program } from 'commander';
import sundial from './commands/index.js';

program
  .version('1.0.0')
  .description('My Command Line Tool');

program
  .command('register')
  .description('Registers sundial application with the CLI!')
  .option('-a, --apiKey <apiKey>', 'Specify the API key')
  .option('-l, --local', 'Specify local flag')
  .action((cmd) => {
    const apiKey = cmd.apiKey;   
    const local = cmd.local; // Check if the '--local' flag exists
    sundial.register({ apiKey, local });
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

program.command('listen')
.description('Listens for updates from application backend')
.action(sundial.listen);

program.command('reset')
.description('Removes the system process entirely')
.action(sundial.reset);

program.command('test')
.description('test')
.action(() => {console.log('testing 123')});

program.parse(process.argv);