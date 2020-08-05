#!/usr/bin/env node
'use strict'

// modulos
const fs = require('fs'); // file system; lee archivo, directorio, etc
const path = require('path');
const fetch = require('fetch');
const fetchUrl = fetch.fetchUrl;

// manejo de colores con chalk
const chalk = require('chalk');
const { url } = require('inspector');

// variables
const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g
let filePath = process.argv[2];
filePath = path.resolve(filePath); // entrega el calculo de una ruta absoluta basado en una relativa
filePath = path.normalize(filePath); // f que trata de calcular ruta cuando tiene especificadores como . .. //

console.log('PATH:', filePath); // indica la ruta del archivo

// leer el directorio
const readingDirectory = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (error, data) => { // data son todos los archivos del dir
      if (error) {
        return reject(error);
      } else {
      return resolve(data)
      }
    })
  })
}

// verificar si es directorio
const verifyDirectory = () => new Promise((resolve, reject) => {
  fs.stat(filePath, (err, stats) => {
    if (err && err.code === 'ENOENT') { // ENOENT significa que no es el archivo o dir correcto
     return resolve(false);
    } else if (err) {
     return reject(err);
    }
    if (stats.isDirectory()) {
     return resolve(true);
    }
    return resolve(false);
   });
})

// consumo de promesa de verifyDirectory
verifyDirectory().then(isDirectory => {
  if (isDirectory) {
    readingDirectory(filePath)
    .then(data => {
      data.forEach((file) => { // si es dir
        let extFile = path.extname(file);
        if (extFile === '.md') {
          returnFileUrls(file); // función que retorna array de links
        }
      })
    })
    .catch(error => console.log(chalk.redBright(error)));
    } else {
    let extFile = path.extname(filePath); // si es archivo directo
    if (extFile === '.md') {
      returnFileUrls(filePath);
    }
  }
})

// función que retorna los links que encuentra en los archivos .md
const returnFileUrls = (file) => {
  fs.readFile(file, "utf-8", (err, file) => { // entra al archivo
    const stringLinks = file.match(RegExr);
    const newArray = Array.from(stringLinks); // transforma en array los strings de match
    if (err) {
      console.log(err);
    }
    else {
      // console.log('nombre del archivo contenedor')
      console.log(newArray)
    }
  });
}

// función que valida los links: da estado http
const validateUrls = (filePath) => {
  fs.readFile(filePath, "utf-8", (err, data) => { // entra al archivo
    const stringLinks = data.match(RegExr);
    if (err) {
      console.log(err);
    } else {
      stringLinks.map((url) => {
        getHttpStatus(url)
        .then((res) => {
          if (res.status === 200) {
          console.log('Status from', url, 'is', chalk.green(res.status), chalk.green('OK ✓'));
          } else if (res.status === 301) {
            console.log('Status from', url, 'is', chalk.green(res.status), chalk.green('OK ✓'));
          } else if (res.status !== 200) {
          console.log('Status from', url, 'is', chalk.red(res.status), chalk.red.inverse('FAIL ✕'));
          }
        })
        .catch((err) => {
          console.log(err.code);
        });
      });
    }
  });
}

// promesa para petición de estado http
const getHttpStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
      if(error) {
        reject(error);
      } else {
        resolve(meta);
      }
    });
  });
}

// función que ofrece estadísticas de los links: total de links,
const statsUrls = (url) => {
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
        getHttpStatus(url) // consumo promesa estado http
        .then((res) => {
          // console.log('esto es res', res)
          if (!uniqueLinks.includes(res.finalUrl)) {
            uniqueLinks.push(res.finalUrl)
            // console.log('Unique links:', uniqueLinks.length)
          }
          if (res.status != 200) {
            brokenLinks++
            // console.log('Broken links:', brokenLinks);
          }
        })
        .catch((err) => {
          console.log(err.code);
        });
      });
    }
  });
}

module.exports = {
  returnFileUrls,
  validateUrls,
  statsUrls,
  filePath,
};

