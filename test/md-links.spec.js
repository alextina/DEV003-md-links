const { mdLinks } = require('../src/index.js');

jest.mock('axios');

describe('mdLinks, pruebas para errores', () => {

  it('debería lanzar un error cuando la ruta no existe', async () => {
    const path = 'noexiste.md';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`${path} is an invalid path.`));
  });

  it('debería lanzar un error cuando el directorio ingresado esta vacío', async () => {
    const path = 'para-pruebas//sin-archivos';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`The directory ${path} is empty`));
  });

  it('debería lanzar un error cuando la ruta del directorio ingresado no es un archivo markdown', async () => {
    const path = 'para-pruebas//archivo-texto.txt';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`The file ${path} is not a Markdown file.`));
  });

  it('debería lanzar un error cuando el archivo markdown no tiene links', async () => {
    const path = 'para-pruebas//sin-links.md';
    expect.assertions(1);
    await expect(mdLinks(path)).rejects.toEqual(new Error(`The Markdown file ${path} does not have links.`));
  });

});

describe('mdLinks, pruebas de éxito', () => {

  it('debería retornar un array con los links: href, text, y file', async () => {
    const path = 'para-pruebas//con-links.md';
    const options = { validate: false };

    expect.assertions(1);
    await expect(mdLinks(path, options)).resolves.toEqual([
      {
        href: 'https://github.com/alextina',
        text: 'éxito',
        file: 'D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md'
      },
      {
        href: 'https://github.com/alextina/noexiste',
        text: 'error',
        file: 'D:\\Laboratoria\\DEV003-md-links\\para-pruebas\\con-links.md'
      }
    ]);
  });

});