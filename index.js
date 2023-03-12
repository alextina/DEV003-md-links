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
    if (existPath(path)) {
      if (!isItAbsolute(path)) {
        absolutePath = toAbsolute(path)
      }
      if (!isItFile(absolutePath)) {
        if (!haveFiles(absolutePath)) {
          reject('No tiene archivos.');
        } else {
          // obteniendo archivos md
          console.log(getMdFiles(absolutePath));
        }
      } else {
        // console.log('revisar si es un archivo .md');
        if (!isItMd(absolutePath)) { // no es un archivo .md
          reject('No es un archivo Markdown.')
          // console.log(`${absolut ePath} no es un archivo Markdown`);
        } else {
          // resolve('Es un archivo Markdown.') // es un archivo md 
          getLinks(absolutePath)
          .then(links => {
            if(links.length === 0) {
              reject('No tiene links.')
            } else {
              resolve(links);
            }
          })
        .catch(error => {
            reject(error);
          })
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
