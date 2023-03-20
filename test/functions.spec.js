const {
  existPath, 
  isItAbsolute,
  toAbsolute,
  isItFile,
  isItMd,
  readDirectory,
  readMdFile,
  getAllFiles,
  getLinks,
} = require('../functions.js');

jest.mock('axios', () => jest.fn());

describe('existPath', () => {
    it('debería retornar "false" para una ruta no existente: noexiste.md', () => {
      expect(existPath('ejemplo.md')).toBe(false);
    });
  
    it('debería retornar "true" para una ruta de directorio: D:\\Laboratoria\\DEV003-md-links\\para-pruebas', () => {
      expect(existPath('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toBe(true);
    });
  
    it('debería retornar "true" para una ruta de archivo: D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md', () => {
      expect(existPath('D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md')).toBe(true);
    });
  });

describe('isItAbsolute', () => {
  it('debería retornar "true" para una ruta absoluta: D:\\Laboratoria\\DEV003-md-links\\para-pruebas', () => {
    expect(isItAbsolute('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toBe(true);
  });
  
  it ('debería retornar "false" para una ruta relativa: para-pruebas\\con-links.md', () => {
    expect(isItAbsolute('para-pruebas\\con-links.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('debería retornar "D:\\Laboratoria\\DEV003-md-links\\para-pruebas" para "para-pruebas"', () => {
    expect(toAbsolute('para-pruebas')).toEqual('D:\\Laboratoria\\DEV003-md-links\\para-pruebas');
  });
});

describe('isItFile', () => {
  it('debería retornar "true" para un archivo: D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md', () => {
  expect(isItFile('D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md')).toBe(true);
  });

  it('debería retornar "false" para un directorio: D:\\Laboratoria\\DEV003-md-links\\para-pruebas', () => {
  expect(isItFile('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toBe(false);
  });
});

describe('isItMd', () => {
  it('debería retornar "true" para un archivo de formato markdown: para-pruebas\\con-links.md', () => {
    expect(isItMd('para-pruebas\\con-links.md')).toBe(true);
  });

  it('debería retornar "false" para un archivo de otro formato: para-pruebas\\archivo-texto.txt', () => {
    expect(isItMd('para-pruebas\\archivo-texto.txt')).toBe(false);
  });
});

describe('readDirectory', () => {
  it('debería retornar un array con los archivos del directorio' , () => {
    expect(readDirectory('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toEqual([
      'archivo-texto.txt',
      'con-archivos',
      'con-links.md',
      'sin-archivos',
      'sin-links.md' ]);
  });
});

describe('getAllFiles', () => {
  it('debería retornar un array con la lista de rutas de los archivos dentro del directorio y subdirectorios', () => {
    expect(getAllFiles('para-pruebas')).toEqual([
      'para-pruebas\\archivo-texto.txt',
      'para-pruebas\\con-archivos\\leyendo-md.md',
      'para-pruebas\\con-archivos\\readme-prueba.md',
      'para-pruebas\\con-links.md',
      'para-pruebas\\sin-links.md'
    ])
  })
})

describe('readMdFile', () => {
  it('debería mostrar el contenido del directorio', async () => {
    const result = await readMdFile('para-pruebas\\con-archivos\\leyendo-md.md');
    expect(result).toEqual('Este es el contenido del archivo markdown.')
  })
})

describe('getLinks', () => {
  it('debería retornar un array de links dentro del archivo markdown', () => {
    readMdFile('para-pruebas\\con-links.md')
    .then((content) => {
      expect(getLinks(content, 'para-pruebas\\con-links.md')).toEqual([
          {
            href: 'https://github.com/alextina',
            text: 'éxito',
            file: 'para-pruebas\\con-links.md'
          },
          {
            href: 'https://github.com/alextina/noexiste',
            text: 'error',
            file: 'para-pruebas\\con-links.md'
          }
        ])
    })
  })
})

// describe('validateLinks', () => {
//   it('debería retornar la lista de todos los links validados con su status http', async () => {
//     const result = await validateLinks([
//       {
//         href: 'https://github.com/alextina',
//         text: 'éxito',
//         file: 'para-pruebas\\con-links.md'
//       }
//     ]);
//     expect(result).toEqual([
//       {
//         href: 'https://github.com/alextina',
//         text: 'éxito',
//         file: 'D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md',
//         status: 200,
//         statusText: 'OK',
//         message: 'ok'
//       }
//     ])
//   })
// })