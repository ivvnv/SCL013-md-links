#!/usr/bin/env node
"use strict";

// modules
const fs = require("fs"); // file system; lee archivo, directorio, etc
const path = require("path");
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;
const { argv } = require("yargs");

// manage colors for chalk
const chalk = require("chalk");
const { url } = require("inspector");

// variables
const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;
let filePath = process.argv[2];

filePath = path.resolve(filePath); // entrega el calculo de una ruta absoluta basado en una relativa
filePath = path.normalize(filePath); // f que trata de calcular ruta cuando tiene especificadores como . .. //
console.log("PATH:", filePath); // indica la ruta del archivo

fs.access(filePath, fs.constants.F_OK, (err) => {
  // detecta si un directorio existe chequeando si fs.access() retorna un error o no.
  console.log(
    `${
      err
        ? chalk.red("PATH does not exist")
        : chalk.green("PATH exists and is valid")
    }`
  );
});

const returnFileUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    // entra al archivo
    const stringLinks = file.match(RegExr);
    const newArray = Array.from(stringLinks); // transforma en array los strings de match
    if (err) {
      console.log(err);
    } else {
      console.log(newArray);
    }
  });
};
returnFileUrls();

// // función para leer directorio
// const readDir = () => {
//   fs.readdir(ruta, (err, archivos) => {
//   archivos.forEach(archivo => {
//      if(archivo.includes('.md')){
//       console.log(archivo)
//      }
//   })
// })
// }

const validateUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => {
    // entra al archivo
    const stringLinks = file.match(RegExr);
    if (err) {
      console.log(err);
    } else {
      stringLinks.map((url) => {
        getHttpStatus(url)
          .then((res) => {
            if (res.status === 200) {
              console.log(
                "Status from",
                url,
                "is",
                chalk.green(res.status),
                chalk.green("OK ✓")
              );
            } else if (res.status === 301) {
              console.log(
                "Status from",
                url,
                "is",
                chalk.green(res.status),
                chalk.green("OK ✓")
              );
            } else if (res.status !== 200) {
              console.log(
                "Status from",
                url,
                "is",
                chalk.red(res.status),
                chalk.red.inverse("FAIL ✕")
              );
            }
          })
          .catch((err) => {
            console.log(err.code);
          });
      });
    }
  });
};

if (argv.validate || argv.v) {
  validateUrls();
}

const getHttpStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(meta);
      }
    });
  });
};

/* const statsUrls = (url) => {
  fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
    const stringLinks = file.match(RegExr);
    const newArray = Array.from(stringLinks)

    let uniqueLinks = []
    let brokenLinks = 0

    console.log('Total links:', stringLinks.length)

    if (err) {
      console.log(err);
    } else {
      newArray.forEach((url) => {
        getHttpStatus(url)
        .then((res) => {
           console.log('esto es res', res)
          if (!uniqueLinks.includes(res.finalUrl)) {
            uniqueLinks.push(res.finalUrl)
            console.log('Unique links:', uniqueLinks.length)
          }
          if (res.status != 200) {
            brokenLinks++
            console.log('Broken links:', brokenLinks);
          }
        })
        .catch((err) => {
          console.log(err.code);
        });
      });
    }
  });
} */

// module.exports = {
//   // mdLinks,
//   returnFileUrls,
//   // readMdFile,
//   // lookForUrl,
//   // urlValidate,
// };
