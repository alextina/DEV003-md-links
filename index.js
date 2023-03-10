const { existPath, isItAbsolute, toAbsolute, isItFile, isItMd, haveFiles, readFiles } = require('./functions');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let absolutePath = path;
    if (existPath(path)) {
      if (!isItAbsolute(path)) {
        absolutePath = toAbsolute(path)
      }
      if (!isItFile(absolutePath)) { // es un directorio
        // console.log('buscar archivos dentro del directorio');
        if (!haveFiles(absolutePath)) {
          console.log('No tiene archivos.');
        } else {
          console.log(readFiles(absolutePath));
        }
      } else {
        // console.log('revisar si es un archivo .md');
        if (!isItMd(absolutePath)) { // no es un archivo .md
          reject('No es un archivo Markdown.')
          // console.log(`${absolutePath} no es un archivo Markdown`);
        } else {
          resolve('Es un archivo Markdown.')
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
