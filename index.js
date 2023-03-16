const { 
    existPath, 
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    getMdFiles,
    readMdFile,
    getLinks,
    validateLinks,
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
        if (getMdFiles(absolutePath).length === 0) {
          reject(new Error('No tiene archivos Marckdown.'));
        } else {
          // muestra los archivos (recursividad para leer archivos md que tengan links)
          console.log(getMdFiles(absolutePath), 'aplicar recursividad para leer cada archivo .md');
        }
      } else {
        if (!isItMd(absolutePath)) {
          reject(new Error('No es un archivo Markdown.'))
        } else {
          readMdFile(absolutePath)
          .then(mdContent => {
            const allLinks = getLinks(mdContent, absolutePath);
            if (allLinks.length === 0) {
              reject(new Error('El archivo Markdown no contiene links.'));
            } else {
              if (!options.validate) {
                resolve(allLinks);
              } else {
                resolve(validateLinks(allLinks));
              }
            }
          })
          .catch((error) => {
            reject(new Error(error))
          });
        }
      }
    }
  })
}

module.exports = {
  mdLinks
};
