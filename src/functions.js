const fs = require('fs');
const path = require('path');
const axios = require('axios');

// valida la ruta
const existPath = (myPath) => {
    return fs.existsSync(myPath);
};

// valida si la ruta es absoluta
const isItAbsolute = (myPath) => {
    return path.isAbsolute(myPath);
};

// convierte la ruta relativa a absoluta
const toAbsolute = (myPath) => {
    return path.resolve(myPath);
};

// valida si la ruta es de un archivo
const isItFile = (myPath) => {
    return fs.statSync(myPath).isFile();
};

// valida si es un archivo .md
const isItMd = (myPath) => {
    const extension = path.extname(myPath);
    return extension === '.md';
};

// Lee (muestra) los archivos dentro del directorio
const readDirectory = (directoryPath) => {
    return fs.readdirSync(directoryPath);
};

// lee archivo .md
const readingFile = (mdFilePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdFilePath, 'utf8', (error, mdContent) => {
            if (error) {
                reject(error);
            } else {
                resolve(mdContent);
            }
        });
    });
};

// obtiene links dentro de direcotrio hasta que no hayan directorios
function getAllFiles(directoryPath, arrayOfFiles = []) {
    const directoryElements = readDirectory(directoryPath);
    directoryElements.forEach((directoryElement) => {
        const elementPath = path.join(directoryPath, directoryElement);
        const fileOrDir = fs.statSync(elementPath);
        if (fileOrDir.isDirectory(directoryPath)) {
            getAllFiles(elementPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(elementPath);
        };
    });
    return arrayOfFiles;
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
};

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
                    statusMessage: response.statusText,
                    ok: 'ok',
                };
            })
            .catch((error) => {
                let errorStatus = 400;
                let errorStatusText = 'internal server error';
                if (error.response) {
                  errorStatus = error.response.status;
                  errorStatusText = error.response.statusText;
                } else if (error.request) {
                  errorStatus = 500;
                } 
                return {
                  text: link.text,
                  href: link.href,
                  file: link.file,
                  status: errorStatus,
                  statusMessage: errorStatusText,
                  ok: 'fail'
                };
              });
    }));
};

module.exports = {
    existPath,
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    readDirectory,
    readingFile,
    getAllFiles,
    getLinks,
    validateLinks,
};