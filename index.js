#!/usr/bin/env node

'use strict';

var program = require('commander');

program
  .version('0.1.0')
  .command('convert [file]', 'convert video to audio')
  //.command('search [query]', 'search with optional query')
  //.command('list', 'list packages installed');

program.parse(process.argv);


if (!process.argv.slice(2).length) {
  program.help();
}
