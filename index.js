const { 
    existPath, 
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    haveFiles,
    getMdFiles,
    getLinks,
    readMdFile,
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
        if (!haveFiles(absolutePath)) {
          reject(new Error('No tiene archivos.'));
        } else {
          // muestra los archivos (recursividad para leer archivos md que tengan links)
          console.log(getMdFiles(absolutePath), 'se tienen que obtener los archivos .md ¿recursividad?');
        }
      } else {
        if (!isItMd(absolutePath)) {
          reject(new Error('No es un archivo Markdown.'))
        } else {
          return readMdFile(absolutePath)
          .then(links => {
            if(links.length === 0) {
              reject(new Error('No tiene links.'))
            }
            const allLinks = getLinks(absolutePath);
            if (options.validate === false) {
              resolve(allLinks);
            } else if (options.validate === true) {
              resolve('aquí se tiene que ejecutar la función validateLinks en cada link')
              // validateLinks(allLinks)
              // .then((validatedLinks) => {
              //   resolve(validatedLinks);
              // })
              // .catch((error) => {
              //   reject(error);
              // });
                };
              })
            }
          }
        }
      }
  )
}

module.exports = {
  mdLinks
};
