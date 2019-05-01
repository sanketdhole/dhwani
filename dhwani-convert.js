#!/usr/bin/env node

'use strict';

var program = require('commander');
var utils = require('./utils');





program
  //.option('-f, --force', 'force installation')
  .parse(process.argv);

var args = program.args;

if (!args.length) {
  console.error('File name or File path required');
  process.exit(1);
}


utils.add();





console.log(args);
// if (program.force) console.log('  force: install');
// pkgs.forEach(function(pkg){
//   console.log('  install : %s', pkg);
// });
// console.log();
