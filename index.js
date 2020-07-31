#!/usr/bin/env node

'use strict'

// modules
const fs = require('fs');
const path = require('path');
// const fetch = require("fetch")
// const fetchUrl = fetch.fetchUrl;

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


const returnFileUrls = () => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    // entra al archivo
    const arrayLinks = file.match(RegExr);
    console.log(chalk.yellow("Reading .md file")); // está leyendo al archivo
    if (err) {
      console.log(err);
    } else {
      arrayLinks.map((url) => {
        console.log(filePath, "\n", chalk.rgb(185, 144, 208).inverse(url));
      });
    }
  });
};
returnFileUrls();

// const getHttpStatus = (arrayLinks) => {
//   return new Promise((resolve, reject) => {
//     fetchUrl(arrayLinks, (error, meta, body) => {
//       if(error) {
//         reject(error);
//       } else {
//         resolve(meta.status);
//       }
//     });
//   });
// }

// let urlLink = arrayLinks(links);

// urlLink.map(element => {
//   fetch(element.Link)
//   .then(res => {
//     if(res.status == 200) {
//       console.log(
//       'funciona'
//       )
//     }
//   })
// })

// let urlLink = "";
// getHttpStatus(arrayLinks)
//   .then(res => {
//     console.log('El estado de', arrayLinks, 'es', res);
//   })
//   .catch(err => {
//     console.log(err);
//   });const mapArrayLinks = () => {
//   arrayLinks.map(linksuelto =>)
// }





// module.exports = readDir;
// module.exports = readMdFile;


// module.exports = () => {
//   // ...
// };
