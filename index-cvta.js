#!/usr/bin/env node

'use strict';

var program = require('commander');
var utils = require('./utils');

program
  //.option('-f, --force', 'force installation')
  .parse(process.argv);

var args = program.args;

if (args.length !== 2) {
  console.error('Input & Output file path are required');
  process.exit(1);
}

utils.convertVideoToAudio(args[0], args[1]);
