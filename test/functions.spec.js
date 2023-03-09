const { existPath, isItAbsolute, toAbsolute, isItFile, isItMd, haveFiles} = require('../functions.js');

describe('existPath', () => {
    it('debería retornar false para una ruta no existente: noexiste.md', () => {
      expect(existPath('ejemplo.md')).toBe(false);
    });
  
    it('debería retornar true para una ruta de directorio: D:/Laboratoria/DEV003-md-links/', () => {
      expect(existPath('D:/Laboratoria/DEV003-md-links/')).toBe(true);
    });
  
    it('debería retornar true para una ruta de archivo: README.md', () => {
      expect(existPath('README.md')).toBe(true);
    });
  });

describe('isItAbsolute', () => {
  it('debería retornar true para una ruta absoluta: D:/Laboratoria/DEV003-md-links/', () => {
    expect(isItAbsolute('D:/Laboratoria/DEV003-md-links/')).toBe(true);
  });
  it ('debería retornar false para una ruta relativa: README.md', () => {
    expect(isItAbsolute('README.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('debería retornar "D:\Laboratoria\DEV003-md-links\README.md" para "README.md"', () => {
    expect(toAbsolute('README.md')).toEqual('D:\\Laboratoria\\DEV003-md-links\\README.md');
  });
});

describe('isItFile', () => {
  it('debería retornar true para "README.md"', () => {
  expect(isItFile('README.md')).toBe(true);
  });
  it('debería retornar false para un "readme-content"', () => {
  expect(isItFile('readme-content')).toBe(false);
  });
});

describe('isItMd', () => {
  it('debería retornar true para un archivo de formato markdown: "README.md"', () => {
    expect(isItMd('README.md')).toBe(true);
  });
  it('debería retornar false para un archivo de otro formato: index.js', () => {
    expect(isItMd('index.js')).toBe(false);
  });
});

describe('haveFiles', () => {
  it('debería retornar true cuando un directorio tiene archivos', () => {
    expect(haveFiles('D:/Laboratoria/DEV003-md-links/')).toBe(true)
  });
})