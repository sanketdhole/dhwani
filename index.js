#!/usr/bin/env node

'use strict';

var program = require('commander');

program
  .version('0.1.0')
  .command('cvta <input_file> <output_file>', 'converts video input into audio output')
  .command('catt <url> <api_key> <input_file> <output_file>', 'converts audio input into text output')
  //.command('search [query]', 'search with optional query')
  //.command('list', 'list packages installed');

program.parse(process.argv);


if (!process.argv.slice(2).length) {
  program.help();
}
