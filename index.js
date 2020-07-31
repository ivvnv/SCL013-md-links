#!/usr/bin/env node

'use strict'

// modules
const fs = require('fs');
const path = require('path');
const fetchUrl = require("fetch").fetchUrl;

// manage colors for chalk
const chalk = require('chalk');
/* const { url } = require('inspector'); */
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


fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
  console.log(chalk.yellow('Reading .md file')); // está leyendo al archivo
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.rgb(185, 144, 208).inverse("Links found inside file"), file.match(RegExr));
  }
});

const getHttpStatus = (urlLink) => {
  return new Promise((resolve, reject) => {
    fetchUrl(urlLink, (error, meta, body) => {
      if(error) {
        reject(error);
      } else {
        resolve(meta.status);
      }
    });
  });
}

let urlLink = "https://www.sohamkamani.com/blog/nodejs-file-system-guide/";
getHttpStatus(urlLink)
  .then(res => {
    console.log('El estado de', urlLink, 'es', res);
  })
  .catch(err => {
    console.log(err);
  });





// module.exports = readDir;
// module.exports = readMdFile;


// module.exports = () => {
//   // ...
// };
