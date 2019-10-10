#!/usr/bin/env node

'use strict';

var program = require('commander');
var utils = require('./utils');
var log = require('log');
var chalk = require('chalk');

program
  //.option('-f, --force', 'force installation')
  .parse(process.argv);

var args = program.args;

if (args.length === 1) {
  log.error(chalk.red('Oops! Please enter an Input file path'));
  process.exit(1);
}
if (args.length > 2) {
  log.error(
    chalk.red(
      'Hold on there, cowboy! We only need 2 arguments to convert video: Input file path and Output file path'
    )
  );
  process.exit(1);
}

log.info('Preparing to convert video to audio...');
utils.convertVideoToAudio(args[0], args[1]);
