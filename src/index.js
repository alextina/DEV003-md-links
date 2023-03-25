const {
  existPath,
  isItAbsolute,
  toAbsolute,
  isItFile,
  isItMd,
  readingFile,
  getAllFiles,
  getLinks,
  validateLinks,
  readDirectory,
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
        const directoryContent = readDirectory(absolutePath);
        if (directoryContent.length === 0) {
          reject(new Error(`The directory ${path} is empty`));
        } else {
          const allFilePaths = getAllFiles(absolutePath, arrayOfFiles = []);
          const promises = []; // array vacio donde se guardaran las promesas
          allFilePaths.forEach((filePath) => {
            // se iran agrenando las promesas a las que se le vaya aplicando mdLinks recursivamente
            promises.push(mdLinks(filePath, options));
          });
          // recorre el array de promesas y retorna su estado 
          Promise.allSettled(promises)
            .then((results) => {
              const arrayResults = [];
              for (let i = 0; i < results.length; i++) {
                const result = results[i];
                // si el estaus del resultado de la promesa es fulfilled
                if (result.status === 'fulfilled') {
                  const res = result.value;
                  for (let j = 0; j < res.length; j++) {
                    const object = res[j];
                    arrayResults.push(object);
                  };
                };
              };
              resolve(arrayResults);
            });
        };
      } else {
        if (!isItMd(absolutePath)) {
          reject(new Error(`The file ${path} is not a Markdown file.`));
        } else {
          readingFile(absolutePath)
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
              reject(new Error(error));
            });
        };
      };
    };
  });
};

module.exports = {
  mdLinks
};
