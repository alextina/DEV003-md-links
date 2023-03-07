const fs = require('fs');
const MarkdownIt = require('markdown-it');
// const md = new MarkdownIt();
// const [, , path] = process.argv;
// console.log(path);

const mdLinks = (path, options) => { // resolve & reject son callbascks que en algun momento serán resueltas
  return new Promise((resolve, reject) => {
  // identifica si la ruta existe
    // verificación de la ruta ¿existe?
    if (fs.existsSync(path)) {
      resolve('la ruta (path) si existe')
      // ¿la ruta es absoluta?
      // ¿es un archivo o directorio?
      // si es un directorio, entonces filtar los archivos md

    } else {
    // si no existe la ruta, entonces rechaza la promesa
    reject('La ruta (path) no existe.');
  }
  })
}

mdLinks(process.argv[2], { option1: true, option2: false })
  .then(links => console.log(process.argv[2]))
  .catch(error => console.log(error));


module.exports = {
  mdLinks
};
