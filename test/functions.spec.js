const { existPath, isItAbsolute, toAbsolute } = require('../functions.js');

describe('existPath', () => {
    it('should return false for a non-existing path', () => {
      // const nonExistingPath = 'ejemplo.md';
      expect(existPath('ejemplo.md')).toBe(false);
    });
  
    it('should return true for an existing directory path', () => {
      // const existingDirectoryPath = 'D:/Laboratoria/DEV003-md-links/';
      expect(existPath('D:/Laboratoria/DEV003-md-links/')).toBe(true);
    });
  
    it('should return true for an existing file path', () => {
      // const existingFilePath = 'README.md';
      expect(existPath('README.md')).toBe(true);
    });
  });

describe('isItAbsolute', () => {
  it('should return true for an absolute path', () => {
    expect(isItAbsolute('D:/Laboratoria/DEV003-md-links/')).toBe(true);
  });
  it ('should return false fon an relative path', () => {
    expect(isItAbsolute('README.md')).toBe(false);
  });
});

describe('toAbsolute', () => {
  it('should return D:\Laboratoria\DEV003-md-links\README.md', () => {
    expect(toAbsolute('README.md')).toEqual('D:\\Laboratoria\\DEV003-md-links\\README.md');
  });
});
