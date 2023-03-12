const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const myPath0 = 'noexiste.md' //
const myPath1 = process.argv[2]; // absoluta: D:\Laboratoria\DEV003-md-links\
const myPath2 = process.argv[3]; // relativa: README.md

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

// const readMdFile = (myPath) => {
// fs.readFile(myPath, 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);    ;
//   } else {
//     console.log(data);
//   }
// });
// }

// console.log(readMdFile(myPath1));

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

// // console.log('------------------------------------------------------------------- ¿Leyendo archivo md');
// readMdFile(myPath1)
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.error(err);
// });

// Extraer links
const getLinks = (filePath) => {  
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, dataLinks) => {
            if (error) {
                reject(error);
            } else {
               const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
               const links = Array.from(dataLinks.matchAll(linkRegex), matchLink => ({
                href: matchLink[2],
                text: matchLink[1],
                file: filePath,
               }));
               resolve(links);
            }
        });
    });
};

// getLinks(myPath1)
// .then(links => {
//     console.log(links);
// })
// .catch(error => {
//     console.log(error);
// })

// // Mostrando resultados node functions.js: D:\Laboratoria\DEV003-md-links\para-pruebas para-pruebas\con-links.md
// console.log('------------------------------------------------------------------- ¿La ruta existe?');
// console.log(myPath0, existPath(myPath0)); // noexiste.md false
// console.log(myPath1, existPath(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
// console.log(myPath2, existPath(myPath2)); // README.md true

// console.log('------------------------------------------------------------------- ¿La ruta es absoluta?');
// console.log(myPath1, isItAbsolute(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
// console.log(myPath2, isItAbsolute(myPath2)); // README.md false

// console.log('------------------------------------------------------------------- Convertir ruta relativa a absoluta');
// console.log(myPath2, ' >>> ', toAbsolute(myPath2)); // README.md  >>>  D:\Laboratoria\DEV003-md-links\README.md

// console.log('------------------------------------------------------------------- ¿La ruta es un archivo?');
// console.log(myPath1, isItFile(myPath1));
// console.log(myPath2, isItFile(myPath2));

// console.log('------------------------------------------------------------------- ¿Es un archivo .md?');
// console.log('README.md >>>', isItMd('README.md')); // true
// console.log('index.js >>>', isItMd('index.js')); // false

// console.log('------------------------------------------------------------------- ¿El directorio tiene elementos?');
// console.log(myPath1, haveFiles(myPath1));

// console.log('------------------------------------------------------------------- ¿Qué elementos tiene el directorio?');
// console.log(`El directorio tiene ${readDirectory(myPath1).length} elementos y son los siguientes`, readDirectory(myPath1));

// console.log('------------------------------------------------------------------- ¿Obtener archivos Marckdown');
// console.log(myPath1, getMdFiles(myPath1));


module.exports = {
    existPath, 
    isItAbsolute,
    toAbsolute,
    isItFile,
    isItMd,
    haveFiles,
    getMdFiles,
    getLinks,
  };
  
