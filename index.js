#!/usr/bin/env node
'use strict'

const fs = require('fs');
const path = require('path');
let pathFile = process.argv[2];

pathFile = path.resolve(pathFile);
pathFile = path.normalize(pathFile); //normaliza los errores de escritura, así los podrá leer bien.
console.log("PATH:", pathFile);

const readDir = () => {
    fs.readdir(pathFile, (err, archivos) => {
    archivos.forEach(archivo => {
       if(archivo.includes('.md')){
        console.log(archivo)
       }
    })
})
}


// fs.readFile(ruta, 'utf-8', (err, data) => {
//     if(err){
// console.log(err)
//     } else {
//     const lines = data.split(/\r?\n/);
//     lines.forEach(line => {
//         console.log('texto', line)
//     })
// }
// })





module.exports = readDir;

// module.exports = () => {
//   // ...
// };
