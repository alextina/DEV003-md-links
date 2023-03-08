const { existPath, isItAbsolute, toAbsolute, isItFile, isItMd} = require('../functions.js');

describe('existPath', () => {
    it('debería retornar false para una ruta no existente', () => {
      // const nonExistingPath = 'ejemplo.md';
      expect(existPath('ejemplo.md')).toBe(false);
    });
  
    it('debería retornar true para una ruta de directorio', () => {
      // const existingDirectoryPath = 'D:/Laboratoria/DEV003-md-links/';
      expect(existPath('D:/Laboratoria/DEV003-md-links/')).toBe(true);
    });
  
    it('debería retornar true para una ruta de archivo', () => {
      // const existingFilePath = 'README.md';
      expect(existPath('README.md')).toBe(true);
    });
  });

describe('isItAbsolute', () => {
  it('debería retornar true para una ruta absoluta', () => {
    expect(isItAbsolute('D:/Laboratoria/DEV003-md-links/')).toBe(true);
  });
  it ('debería retornar false para una ruta relativa', () => {
    expect(isItAbsolute('README.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('debería retornar D:\Laboratoria\DEV003-md-links\README.md', () => {
    expect(toAbsolute('README.md')).toEqual('D:\\Laboratoria\\DEV003-md-links\\README.md');
  });
});

describe('isItFile', () => {
  it('debería retornar true para un "archivo"', () => {
  expect(isItFile('README.md')).toBe(true);
  });
  it('debería retornar false para un "directorio"', () => {
  expect(isItFile('readme-content')).toBe(false);
  });
});

describe('isItMd', () => {
  it('debería retornar true para un archivo de formato .md', () => {
    expect(isItMd('README.md')).toBe(true);
  });
  it('debería retornar false para un archivo de otro formato', () => {
    expect(isItMd('index.js')).toBe(false);
  });
});