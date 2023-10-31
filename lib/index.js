#!/usr/bin/env node
"use strict";

var _commander = require("commander");
var _index = _interopRequireDefault(require("./commands/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_commander.program.version('1.0.0').description('My Command Line Tool');
_commander.program.command('run').description('Pings monitor and runs cron job').action(function () {
  _index["default"].run(_commander.program);
});
_commander.program.command('discover').description('Discover jobs to add endpoints to!').option('-f, --full', 'Discover all jobs and monitors with one command!').action(function (options) {
  _index["default"].discover(options);
});
_commander.program.command('update').description('Get updates to crontab!').action(_index["default"].update);
_commander.program.parse(process.argv);