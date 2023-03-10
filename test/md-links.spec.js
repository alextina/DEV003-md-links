const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  it('Debe rechazar (reject) cuando la ruta (path) no existe', () => {
    return mdLinks('\\path\\noexiste.md').catch((error) => {
      expect(error).toBe('La ruta (path) no existe.')
    })
  });
});
