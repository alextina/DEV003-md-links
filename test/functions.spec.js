const { existPath, isItAbsolute, toAbsolute, isItFile, isItMd, haveFiles, readFiles} = require('../functions.js');

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

describe('haveFiles', () => {
  it('debería retornar "true" cuando un directorio tiene archivos', () => {
    expect(haveFiles('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toBe(true);
  });

  it('debería retornar "false" cuando un directorio no tiene archivos', () => {
    expect(haveFiles('D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\sin-archivos')).toBe(false);
  });
});

describe('readFiles', () => {
  it('debería retornar los archivos del directorio' , () => {
    expect(readFiles('D:\\Laboratoria\\DEV003-md-links\\para-pruebas')).toEqual([ 'archivo-texto.txt', 'con-links.md', 'sin-archivos' ]);
  });
});