const fs = require('fs');
const path = require('path');
const axios = require('axios');

// valida la ruta
const existPath = (myPath) => {
    return fs.existsSync(myPath);
}

// valida si la ruta es absoluta
const isItAbsolute = (myPath) => {
    return path.isAbsolute(myPath);
}

// convierte la ruta relativa a absoluta
const toAbsolute = (myPath) => {
    return path.resolve(myPath)
}

// valida si la ruta es de un archivo
const isItFile = (myPath) => {
    return fs.statSync(myPath).isFile();
}

// valida si es un archivo .md
const isItMd = (myPath) => {
    const extension = path.extname(myPath);
    return extension === '.md';
}

// Lee (muestra) los archivos dentro del directorio
const readDirectory = (directoryPath) => {
    return fs.readdirSync(directoryPath)
}

// obtiene solo los archivos .md del directorio
const getMdFiles = (directoryPath) => {
    const files = readDirectory(directoryPath).filter(isItMd);
    let mdFiles = [];

    for(let i = 0; i < files.length; i++) {
        const filePath = path.join(directoryPath, files[i]);
        mdFiles.push(filePath);
    };
    return mdFiles;
}

// lee archivo .md
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

// extrae links del archivo .md
const getLinks = (mdContent, filePath) => {
    const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
    const links = Array.from(mdContent.matchAll(linkRegex), matchedLink => ({
        href: matchedLink[2],
        text: matchedLink[1],
        file: filePath,
    }));
    return links;
}

// // probando codigo
// readMdFile('para-pruebas/con-links.md')
// .then(allContent => console.log(getLinks(allContent, 'para-pruebas/con-links.md')))
// .catch(error => console.log(error))

// // extrae links del archivo .md
// const getLinks = (filePath) => {  
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, 'utf8', (error, allData) => {
//             if (error) {
//                 reject(error);
//             } else {
//                const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
//                const links = Array.from(allData.matchAll(linkRegex), matchedLink => ({
//                 href: matchedLink[2],
//                 text: matchedLink[1],
//                 file: filePath,
//                }));
//                resolve(links);
//             }
//         });
//     });
// };

// // valida solo 1 link (muestra status)
// const validateLink = (link) => {
//     return new Promise((resolve, reject) => {
//         axios.get(link)
//         .then((response) => {
//             resolve({
//                 link, 
//                 status: response.status,
//                 statusText: response.statusText,
//                 message: 'ok',
//             });
//         })
//         .catch((error) => {
//             if(error.response) {
//                 reject({
//                     link, 
//                     status: error.response.status,
//                     statusText: error.response.statusText,
//                     message: 'fail',
//                   });
//             } else {
//                 reject({
//                      link,
//                      error: error.message,
//                      message: 'fail',
//                 })
//             }
//         })
//     })
// }

// valida links dentro de un array (muestra status)
const validateLinks = (allLinks) => {    
    return Promise.all(allLinks.map((link) => {
        return axios.get(link.href)
        .then((response) => {
            return {
                link: link, 
                status: response.status,
                statusText: response.statusText,
                message: 'ok',
            };
        })
        .catch((error) => {
            if(error.response) {
                return {
                    link: link, 
                    status: error.response.status,
                    statusText: error.response.statusText,
                    message: 'fail',
                    };
            } // else {
            //     // throw new Error(`Error al hacer la petición al enlace ${link.href}: ${error.message}`);
            //     return {
            //             link,
            //             error: error.message,
            //     }
            // }
        })
    }))
}

// const validateLinks = (arrLinks) => Promise.all(arrLinks.map((link) => axios.get(link.href)
//   .then((respuesta) => {
//     return { link, status: respuesta.status, message: 'ok' };
//   })
//   .catch((error) => {
//     return { link, status: error.response.status, message: 'fail' };
//   })

// ));

module.exports = {
    existPath, // a index.js + functions.espect.js
    isItAbsolute, // a index.js + functions.espect.js
    toAbsolute, // a index.js + functions.espect.js
    isItFile, // a index.js + functions.espect.js
    isItMd, // a index.js + functions.espect.js
    readDirectory, // functions.espect.js
    getMdFiles, // a index.js
    readMdFile,
    getLinks, // a index.js
    validateLinks,
  };