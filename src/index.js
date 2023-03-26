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
      reject(new Error(`${path} is an invalid path.`));
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
          const promises = [];
          allFilePaths.forEach((filePath) => {
            promises.push(mdLinks(filePath, options));
          });
          Promise.allSettled(promises)
            .then((results) => {
              const arrayResults = [];
              for (let i = 0; i < results.length; i++) {
                const result = results[i];
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
