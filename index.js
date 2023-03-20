const { 
    existPath, 
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    getMdFiles,
    readMdFile,
    getAllFiles,
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
          const allFilePaths = getAllFiles(absolutePath, arrayOfFiles = []);
          let promises = [];
          allFilePaths.forEach((filePath) => {
            promises.push(mdLinks(filePath, options))
          });
          Promise.allSettled(promises)
          .then((results) => {
            let allFilePathsArray = [];
            for(let i = 0; i < results.length; i++) {
              const result = results[i];
              if (result.status === 'fulfilled') {
                const res = result.value;
                for(let j = 0; j < res.length; j++) {
                  const object = res[j];
                  allFilePathsArray.push(object);
                };
              } else {
                const error = result.reason;
                console.log(error.message);
              };
            };
            resolve(allFilePathsArray);
          })
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
