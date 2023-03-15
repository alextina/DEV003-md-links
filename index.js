const { 
    existPath, 
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    haveFiles,
    getMdFiles,
    getLinks,
 } = require('./functions');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let absolutePath = path;
    if (!existPath(path)) {
        reject(new Error('La ruta (path) no existe.'));
    } else {
      if (!isItAbsolute(path)) {
        absolutePath = toAbsolute(path)
      }
      if (!isItFile(absolutePath)) {
        if (!haveFiles(absolutePath)) {
          reject(new Error('No tiene archivos.'));
        } else {
          // muestra los archivos (recursividad para leer archivos md que tengas links)
          console.log(getMdFiles(absolutePath));
        }
      } else {
        if (!isItMd(absolutePath)) {
          reject(new Error('No es un archivo Markdown.'))
        } else {
          getLinks(absolutePath)
          .then(links => {
            if(links.length === 0) {
              reject(new Error('No tiene links.'))
            } else {
              resolve(links);
            }
          })
          .catch(error => {
            reject(error);
          })
        }
      }
    }
  })
}

module.exports = {
  mdLinks
};
