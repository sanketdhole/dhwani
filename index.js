#!/usr/bin/env node

'use strict';

var program = require('commander');
var log = require('log');

program
  .version('0.1.0')
  .command(
    'cvta <input_file> <output_file>',
    'converts video input into audio output'
  )
  .command(
    'catt <url> <api_key> <input_file> <output_file>',
    'converts audio input into text output'
  )
  .command(
    'ta <url> <api_key> <input_file> <output_file>',
    'perform text analytics'
  );
//.command('list', 'list packages installed');

log.info(`Thank you for using Dhwani! Let's get started!`);
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
