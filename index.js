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
        reject(new Error(`${path} is an nvalid path.`));
    } else {
      if (!isItAbsolute(path)) {
        absolutePath = toAbsolute(path);
      };
      if (!isItFile(absolutePath)) {
        const allMdFiles = getMdFiles(absolutePath);
        if (allMdFiles.length === 0) {
          reject(new Error(`The directory ${path} does not have Markdown (.md) files.`));
        } else {
          // muestra los archivos (¿recursividad para leer archivos md que tengan links?)
          console.log(allMdFiles)
          // allMdFiles.forEach((mdFile) => console.log(mdFile, `aplicar recursividad aquí`))
        };
      } else {
        if (!isItMd(absolutePath)) {
          reject(new Error(`The file ${path} is not a Markdown file.`));
        } else {
          readMdFile(absolutePath)
          .then((mdContent) => {
            const allLinks = getLinks(mdContent, absolutePath);
            if (allLinks.length === 0) {
              reject(new Error(`The Markdown file ${path} does not have links.`));
            } else {
              if (!options.validate) {  
                resolve(allLinks);
              } else {
                resolve(validateLinks(allLinks));
              };
            };
          })
          .catch((error) => {
            reject(new Error(error))
          });
        };
      };
    };
  });
};

module.exports = {
  mdLinks
};
