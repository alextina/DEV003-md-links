const fs = require('fs');
const path = require('path');
const myPath0 = 'noexiste.md' //
const myPath1 = process.argv[2]; // absoluta: D:\Laboratoria\DEV003-md-links\
const myPath2 = process.argv[3]; // relativa: README.md

// console.log(process.argv);

// ¿la ruta existe?
const existPath = (myPath) => {
    return fs.existsSync(myPath);
}

// ¿la ruta es absoluta?
const isItAbsolute = (myPath) => {
    return path.isAbsolute(myPath);
}

// Convertor ruta relativa a absoluta
const toAbsolute = (myPath) => {
    return path.resolve(myPath)
}

// ¿La ruta es un archivos?
const isItFile = (myPath) => {
    return fs.statSync(myPath).isFile();
}

// Es un archivo .md
const isItMd = (myPath) => {
    const extension = path.extname(myPath);
    return extension === '.md';
}

// El directorio tiene archivos (versión sincrona para leer archivos)
const haveFiles = (myPath) => {
    if(fs.readdirSync(myPath).length > 0) {
        return true;
    } else {
        return false;
    }
}

const readFiles = (myPath) => {
    return fs.readdirSync(myPath)
}

// // Mostrando resultados node functions.js: D:\Laboratoria\DEV003-md-links\para-pruebas para-pruebas\con-links.md
// console.log('------------------------------------------------------------------- ¿La ruta existe?');
// console.log(myPath0, existPath(myPath0)); // noexiste.md false
// console.log(myPath1, existPath(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
// console.log(myPath2, existPath(myPath2)); // README.md true

// console.log('------------------------------------------------------------------- ¿La ruta es absoluta?');
// console.log(myPath1, isItAbsolute(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
// console.log(myPath2, isItAbsolute(myPath2)); // README.md false

// console.log('------------------------------------------------------------------- Convertir ruta relativa a absoluta');
// console.log(myPath2, ' >>> ', toAbsolute(myPath2)); // README.md  >>>  D:\Laboratoria\DEV003-md-links\README.md

// console.log('------------------------------------------------------------------- ¿La ruta es un archivo?');
// console.log(myPath1, isItFile(myPath1));
// console.log(myPath2, isItFile(myPath2));

// console.log('------------------------------------------------------------------- ¿Es un archivo .md?');
// console.log('README.md >>>', isItMd('README.md')); // true
// console.log('index.js >>>', isItMd('index.js')); // false

// console.log('------------------------------------------------------------------- ¿El directorio tiene archivos?');
// console.log(myPath1, '¿tiene archivos? >>>', haveFiles(myPath1));
// // console.log('cuántos y cuáles son? >>>', `son ${readFiles(myPath1).length}`, readFiles(myPath1));

// console.log('------------------------------------------------------------------- ¿Qué archivos tiene el directorio?');
// console.log(readFiles(myPath1));

module.exports = {
    existPath, isItAbsolute, toAbsolute, isItFile, isItMd, haveFiles, readFiles
  };
  
