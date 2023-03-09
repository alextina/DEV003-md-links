const { existPath, isItAbsolute, toAbsolute, isItFile, isItMd, haveFiles, readFiles } = require('./functions');

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
        // console.log('buscar archivos dentro del directorio');
        if (!haveFiles(absolutePath)) {
          console.log('no tiene archivos');
        } else {
          console.log(readFiles(absolutePath));
        }
      } else {
        // console.log('revisar si es un archivo .md');
        if (!isItMd(absolutePath)) { // no es un archivo .md
          // throw new Error(`${absolutePath} no es un archivo Markdown`)
          console.log(`${absolutePath} no es un archivo Markdown`);
        } else {
          resolve('es un archivo Markdown')
        }
      }
    } else {
    // si no existe la ruta, entonces rechaza la promesa
    reject('La ruta (path) no existe.');
  }
  })
}

module.exports = {
  mdLinks
};
