const { mdLinks } = require('../index.js');
jest.mock('axios', () => jest.fn());

describe('mdLinks', () => {
  it('Debe lanzar un error cuando la ruta no existe', async () => {
    const path = 'noexiste.md';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`${path} is an nvalid path.`));
  });

  it('Debe lanzar un error cuando la ruta del directorio ingresado esta vacío', async () => {
    const path = 'para-pruebas//sin-archivos';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`The directory ${path} is empty`));
  })

  // it('Debe lanzar un error cuando la ruta del directorio ingresado esta vacío', async () => {
  //   const path = 'para-pruebas//sin-archivos';
  //   expect.assertions(1);
  //   await expect(mdLinks(path)).rejects.toEqual(new Error(`The directory ${path} is empty`));
  // })

});
