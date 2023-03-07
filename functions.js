const fs = require('fs');
const path = require('path');
const myPath0 = 'alejandra' //
const myPath1 = process.argv[2]; // absoluta: D:\Laboratoria\DEV003-md-links\
const myPath2 = process.argv[3]; // relativa: README.md

console.log(process.argv);

console.log('----------- ¿la ruta existe? -----------');
const existPath = (myPath) => {
    return fs.existsSync(myPath);
}

console.log(myPath0, existPath(myPath0)); // alejandra false
console.log(myPath1, existPath(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
console.log(myPath2, existPath(myPath2)); // README.md true

console.log('----------- ¿la ruta es absoluta? -----------');
const isItAbsolute = (myPath) => {
    return path.isAbsolute(myPath);
}

console.log(myPath1, isItAbsolute(myPath1)); // D:/Laboratoria/DEV003-md-links/ true
console.log(myPath2, isItAbsolute(myPath2)); // README.md false

console.log('----------- Convertir ruta relativa a absoluta -----------');
const toAbsolute = (myPath) => {
    return path.resolve(myPath)
}

console.log(myPath2, ' >>> ', toAbsolute(myPath2)); // README.md  >>>  D:\Laboratoria\DEV003-md-links\README.md

console.log('----------- ¿la ruta es un archivo o directorio? -----------');

// const isItFile = (myPath) => {
//     return fs.statSync(myPath).isFile();
// }

// const isItFile = (myPath) => {
//     return fs.statSync(myPath).isDirectory();
// }

const fileOrDirectory = (myPath) => {
    if (fs.statSync(myPath).isFile()) {
        console.log(myPath, 'es archivo');
    } else {
        console.log(myPath, 'es directorio');
    };
}

fileOrDirectory(myPath1); // D:/Laboratoria/DEV003-md-links/ es directorio
fileOrDirectory(myPath2); // README.md es archivo

console.log('----------- ¿Es un archivo .md? -----------');

const isItMd = (myPath) => {
    const extension = path.extname(myPath);
    return extension === '.md';
}

console.log(isItMd('README.md')); // true
console.log(isItMd('index.js')); // false

console.log('----------- ¿El directorio tiene archivos? -----------');

const haveFiles = (myPath) => {
    return fs.readdir(myPath, (err, files) => {
        if (err) {
        console.log(`Error al leer el directorio: ${err}`);
        } else {
        if (files.length === 0) {
            console.log(`El directorio ${myPath} está vacío`);
        } else {
            console.log(`El directorio ${myPath} contiene ${files.length} archivos`);
        }
        }
    });
}

haveFiles(myPath1) // El directorio D:/Laboratoria/DEV003-md-links/ contiene 14 archivos


