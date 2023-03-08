const fs = require('fs');
const existPath = require('./functions');
const isItAbsolute = require('./functions');
const toAbsolute = require('./functions');
const isItFile = require('./functions');

// const [, , path] = process.argv;
// console.log(path);

const mdLinks = (path, options) => { // resolve & reject son callbascks que en algun momento serán resueltas
  return new Promise((resolve, reject) => {
    let absolutePath = path;
    if (existPath(path)) {
      if (!isItAbsolute(path)) {
        absolutePath = toAbsolute(path)
      }
      if (!isItFile(absolutePath)) { // es un directorio
        console.log('buscar archivos dentro del directorio');
      } else {
        console.log('revisar si es un archivo .md');
      }
      resolve('la ruta (path) si existe')
    } else {
    // si no existe la ruta, entonces rechaza la promesa
    reject('La ruta (path) no existe.');
  }
  })
}

module.exports = {
  mdLinks
};
