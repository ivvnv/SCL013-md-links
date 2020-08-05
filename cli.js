#!/usr/bin/env node
const {argv} = require('yargs');
const { validateUrls, statsUrls } = require('./index.js');

const path = process.argv[2]

if ((argv.validate || argv.v) && (argv.stats || argv.s)) {
  validateUrls(path);
  statsUrls(path);
} else if (argv.validate || argv.v) {
  validateUrls(path);
} else if (argv.stats || argv.s) {
  statsUrls(path);
} 
