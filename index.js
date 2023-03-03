const fs = require('fs');

const mdLinks = (path, options) => { // resolve & reject son callbascks que en algun momento serán resueltas
  return new Promise((resolve, reject) => {
    // identifica si la ruta existe
    if (fs.existsSync(path)) {
      // verificación de la ruta ¿existe?
      // ¿la ruta es absoluta?
      // ¿es un archivo o directorio?
      // si es un directorio, entonces filtar los archivos md

    } else {
    // si no existe la ruta, entonces rechaza la promesa
    reject('La ruta (path) no existe.');
  }
  })
}

// module.exports = () => {

// };

module.exports = {
  mdLinks
};
