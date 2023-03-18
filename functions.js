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
    return fs.readdirSync(directoryPath);
}

// obtiene solo los archivos .md del directorio YA NO SIRVE, porque tengo que ver si tiene o no tiene archivos!!!!!!!!
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

// valida links dentro de un array (muestra status)
const validateLinks = (allLinks) => {    
    return Promise.all(allLinks.map((link) => {
        return axios.get(link.href)
        .then((response) => {
            return {
                href: link.href,
                text: link.text,
                file: link.file, 
                status: response.status,
                statusText: response.statusText,
                message: 'ok',
            };
        })
        .catch((error) => {
            if(error.response) {
                return {
                    href: link.href,
                    text: link.text,
                    file: link.file, 
                    status: error.response.status,
                    statusText: error.response.statusText,
                    message: 'fail',
                    };
            }
        })
    }))
}


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