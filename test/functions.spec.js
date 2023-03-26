const axios = require('axios');
const {
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
} = require('../src/functions.js');

// jest.mock('axios', () => jest.fn());
jest.mock('axios');

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

  it('debería retornar "false" para una ruta relativa: para-pruebas\\con-links.md', () => {
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
  it('debería retornar un array con los archivos del directorio', () => {
    expect(readDirectory('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toEqual([
      'archivo-texto.txt',
      'con-archivos',
      'con-links.md',
      'sin-archivos',
      'sin-links.md']);
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
    ]);
  });
});

describe('readingFile', () => {
  it('debería mostrar el contenido de un archivo', async () => {
    const result = await readingFile('para-pruebas\\con-archivos\\leyendo-md.md');
    expect(result).toEqual('Este es el contenido del archivo markdown.');
  });
  it('debería arrojar un error si intenta leer un directorio', () => {
    expect(readingFile('para-pruebas\\con-archivos')).rejects.toThrow('EISDIR: illegal operation on a directory, read');
  });
});

describe('getLinks', () => {
  it('debería retornar un array de links dentro del archivo markdown', () => {
    return readingFile('para-pruebas\\con-links.md')
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
        ]);
      });
  });
});

describe('validateLinks', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it('cuando la petición es exitosa debería retornar los links validados con su status http con ok: ok', async () => {
    const successfulResponse = { status: 200, statusText: 'OK' };
    axios.get.mockResolvedValueOnce(Promise.resolve(successfulResponse));
    const link = { href: 'https://siexiste.com', text: 'éxito', file: 'archivo.md' };

    const result = await validateLinks([link]);

    expect(result).toEqual([
      {
        href: 'https://siexiste.com',
        text: 'éxito',
        file: 'archivo.md',
        status: 200,
        statusMessage: 'OK',
        ok: 'ok'
      }
    ]);
  });

  it('cuando la petición falla debería retornar los links validados con su status http con ok: fail', async () => {
    const errorResponse = { response: { status: 404, statusText: 'Not found' } };
    axios.get.mockResolvedValueOnce(Promise.reject(errorResponse));
    const link = { href: 'https://noexiste.com', text: 'error', file: 'archivo.md' };

    const result = await validateLinks([link]);

    expect(result).toEqual([
      {
        href: 'https://noexiste.com',
        text: 'error',
        file: 'archivo.md',
        status: 404,
        statusMessage: 'Not found',
        ok: 'fail'
      }
    ]);
  });

  it('cuando la petición falla debería retornar los links validados con su status http con status: 500', async () => {
    const error = { request: 'error de red o servidor' };
    axios.get.mockRejectedValue(error);
    const link = { href: 'http://example.com', text: 'Ejemplo', file: 'archivo.md' };

    const result = await validateLinks([link]);

    expect(result).toEqual([
      {
        href: 'http://example.com',
        text: 'Ejemplo',
        file: 'archivo.md',
        status: 500,
        statusMessage: 'internal server error',
        ok: 'fail'
      }
    ]);
  });
});
