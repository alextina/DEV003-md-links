const fs = require('fs');
const path = require('path');
// const axios = require('axios');

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
const readDirectory = (directoryPath) => {
    return fs.readdirSync(directoryPath)
}

const getMdFiles = (directoryPath) => {
    const files = readDirectory(directoryPath).filter(isItMd);
    const mdFiles = [];

    for(let i = 0; i < files.length; i++) {
        const filePath = path.join(directoryPath, files[i]);
        mdFiles.push(filePath);
    };
    return mdFiles;
}

// Leyendo archivo Marckdown
const readMdFile = (filePath) => {  
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, mdContent) => {
            if (error) {
                reject(error);
            } else {
                resolve(mdContent);
            }
        });
    });
};  

// readMdFile('D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md')
// .then( result => console.log(result)
// .catch(error => console.log(error)))

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

// valida solo 1 link
const validateLink = (link) => {
    return new Promise((resolve, reject) => {
        axios.get(link)
        .then((response) => {
            resolve({
                link, 
                status: response.status,
                statusText: response.statusText,
                message: 'ok',
            });
        })
        .catch((error) => {
            if(error.response) {
                reject({
                    link, 
                    status: error.response.status,
                    statusText: error.response.statusText,
                    message: 'fail',
                  });
            } else {
                reject({
                     link,
                     error: error.message,
                })
            }
        })
    })
}

// validateLink('http://github.com')
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// })

// validateLink('http://github.com/noexistepagina')
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// })


//allLinks es un array de links
const validateLinks = (allLinks) => {    
    return Promise.all(allLinks.map((link) => {
        return axios.get(link.href)
        .then((response) => {
            return {
                link: link.href, 
                status: response.status,
                statusText: response.statusText,
                message: 'ok',
            };
        })
        .catch((error) => {
            if(error.response) {
                return {
                    link: link.href, 
                    status: error.response.status,
                    statusText: error.response.statusText,
                    message: 'fail',
                    };
            } else {
                return {
                        link,
                        error: error.message,
                }
            }
        })
    }))}

// const links = [
//     {
//         href: 'https://github.com/alextina',
//         text: 'éxito',
//         file: 'D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md'
//     },
//     {
//         href: 'https://github.com/alextina/noexiste',
//         text: 'error',
//         file: 'D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md'
//     }
// ];

// validateLinks(links)
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log(error);
// })


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
    validateLink,
    validateLinks,
  };
  
