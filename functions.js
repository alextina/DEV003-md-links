const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');

// console.log(process.argv);

// ¿la ruta existe?
const existPath = (myPath) => {
    return fs.existsSync(myPath);
}

// ¿la ruta es absoluta?
const isItAbsolute = (myPath) => {
    return path.isAbsolute(myPath);
}

// Convertor ruta relativa a absoluta
const toAbsolute = (myPath) => {
    return path.resolve(myPath)
}

// ¿La ruta es un archivos?
const isItFile = (myPath) => {
    return fs.statSync(myPath).isFile();
}

// Es un archivo .md
const isItMd = (myPath) => {
    const extension = path.extname(myPath);
    return extension === '.md';
}

// El directorio tiene archivos (versión sincrona para leer archivos)
const haveFiles = (myPath) => {
    if(fs.readdirSync(myPath).length > 0) {
        return true;
    } else {
        return false;
    }
}

// Verifica si el directorio tiene archivos
const readDirectory = (filePath) => {
    return fs.readdirSync(filePath)
}

// obtiene los archivos md
const getMdFiles = (directoryPath) => {
    return readDirectory(directoryPath).filter(isItMd).map((filePath) => {
        return path.join(directoryPath, filePath);
    });
}

// Leyendo archivo Marckdown
const readMdFile = (filePath) => {  
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};  

// readMdFile('D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md')
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// })

// Extraer links
const getLinks = (filePath) => {  
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, allData) => {
            if (error) {
                reject(error);
            } else {
               const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
               const links = Array.from(allData.matchAll(linkRegex), matchedLink => ({
                href: matchedLink[2],
                text: matchedLink[1],
                file: filePath,
               }));
               resolve(links);
            }
        });
    });
};

const axios = require('axios');

const validateLink = (link) => {
    return new Promise((resolve, reject) => {
        axios.get(link)
        .then((response) => {
            resolve({
                link, 
                status: response.status,
                statusText: response.statusText,
                // ok,
            });
        })
        .catch((error) => {
          reject({
            link, 
            status: error.response.status,
            statusText: error.response.statusText,
            // fail,
          });
        })
    })
}

validateLink('https://github.com/alextina')
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
})


module.exports = {
    existPath, // a index.js + functions.espect.js
    isItAbsolute, // a index.js + functions.espect.js
    toAbsolute, // a index.js + functions.espect.js
    isItFile, // a index.js + functions.espect.js
    isItMd, // a index.js + functions.espect.js
    haveFiles, // a index.js + functions.espect.js
    readDirectory, // functions.espect.js
    getMdFiles, // a index.js
    readMdFile, // functions.espect.js
    getLinks, // a index.js
  };
  
