#!/usr/bin/env node

'use strict';

var program = require('commander');
var utils = require('./utils');

program
  //.option('-f, --force', 'force installation')
  .parse(process.argv);

var args = program.args;

if (args.length !== 4) {
  console.error('URL, API_KEY, Input & Output file path are required');
  process.exit(1);
}

utils.textAnalysis(args[0], args[1], args[2], args[3]);
