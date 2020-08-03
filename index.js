#!/usr/bin/env node

'use strict'

// modules
const fs = require('fs');
const path = require('path');
const fetch = require('fetch');
const fetchUrl = fetch.fetchUrl;
const {argv} = require('yargs')

// manage colors for chalk
const chalk = require('chalk');
// const { url } = require('inspector');
const error = chalk.dim.red.underline;


let filePath = process.argv[2];
filePath = path.resolve(filePath); // entrega el calculo de una ruta absoluta basado en una relativa
filePath = path.normalize(filePath); // f que trata de calcular ruta cuando tiene especificadores como . .. //
console.log('PATH:', filePath); // indica la ruta del archivo

fs.access(filePath, fs.constants.F_OK, (err) => {
  // detecta si un directorio existe chequeando si fs.access() retorna un error o no.
  console.log((`${err ? chalk.red('PATH does not exist') : chalk.green('PATH exists and is valid')}`));
});

const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;



const returnFileUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
    const arrayLinks = file.match(RegExr);
    console.log(chalk.yellow('Reading .md file...')); // está leyendo al archivo
    if (err) {
      console.log(err);
    } else {
      arrayLinks.map((url) => {
        console.log(filePath, "\n", chalk.rgb(185, 144, 208).inverse(url));
      });
    }
  });
}
// returnFileUrls()

const validateUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
    const arrayLinks = file.match(RegExr);
    if (err) {
      console.log(err);
    } else {
      arrayLinks.map((url) => {
        getHttpStatus(url)
        .then((res) => {
          if (res === 200) {
          console.log('Status from', url, 'is', chalk.green(res), chalk.green('OK ✓'));
          } else if (res !== 200) {
          console.log('Status from', url, 'is', chalk.red(res), chalk.red.inverse('FAIL ✕'));
          }
        })
        .catch((err) => {
          console.log(err.code);
        });
      });
    }
  });
}


if (argv.validate || argv.v) {
  validateUrls();
}
    
const getHttpStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
      if(error) {
        reject(error);
      } else {
        resolve(meta.status);
      }
    });
  });
}

const statsUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
    const arrayLinks = file.match(RegExr);

    const uniqueLinks2 = [...new Set(arrayLinks.map((link) => link === 200))].length;
    let brokenLinks = 0

    console.log('Total links:', arrayLinks.length)

    if (err) {
      console.log(err);
    } else {
      arrayLinks.map((url) => {
        getHttpStatus(url)
        .then((res) => {
          // if (res == 200) {
          //   console.log('Unique links:', uniqueLinks2)
          // } else if (res != 200) {
          // console.log('Broken links:', brokenLinks++);
          // } 
        })
        .catch((err) => {
          console.log(err.code);
        });
      });
    }
  });
}

if (argv.stats || argv.s) {
  statsUrls();
}

// module.exports = {
//   // mdLinks,
//   returnFileUrls,
//   // readMdFile,
//   // lookForUrl,
//   // urlValidate,
// };