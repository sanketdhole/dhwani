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

if (args.length === 0) {
  log.error(
    chalk.red(`
    Oops! We need more information from you. Missing:
    - URL
    - API Key
    - Input file path
  `)
  );
  process.exit(1);
}

if (args.length === 1) {
  log.error(
    chalk.red(`
    Oops! We need more information from you. Missing:
    - API Key
    - Input file path
  `)
  );
  process.exit(1);
}

if (args.length === 2) {
  log.error(
    chalk.red(`
    Oops! We need more information from you. Missing:
    - Input file path
  `)
  );
  process.exit(1);
}

log.info('Preparing to convert audio to text...');
utils.convertAudioToText(args[0], args[1], args[2], args[3]);
