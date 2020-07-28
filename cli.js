const fs = require('fs');
const ruta = process.argv[2];

const readDir = () => {
    fs.readdir(ruta, (err, archivos) => {
    archivos.forEach(archivo => {
       if(archivo.includes('.md')){
        console.log(archivo)
       }
    })
})
}

module.exports = readDir;


// fs.readFile(file, 'utf-8', (err, data) => {
//     if(err){
// console.log(err)
//     } else {
//     const lines = data.split(/\r?\n/);
//     lines.forEach(line => {
//         console.log('texto', line)
//     })
// }
// })