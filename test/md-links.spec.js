const { mdLinks } = require('../index.js');
jest.mock('axios', () => jest.fn());

describe('mdLinks', () => {
  it('Debe rechazar (reject) cuando la ruta (path) no existe', async () => {
    const path = 'noexiste.md';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`${path} is an nvalid path.`));
    // return mdLinks(path).catch((error) => { // nunca se entra al catch
    //   expect(error).toEqual(new Error(`${path} is an nvalid path.`));
    // });
  });
});
