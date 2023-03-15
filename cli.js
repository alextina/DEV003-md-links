const { mdLinks } = require('./index.js');
const path = process.argv[2];
const validate = process.argv[3] === 'true'; // si 'true' devuelve true, de lo contrario devuelve false
const options = { validate };

mdLinks(path, options)
.then ((resolve) => {
    console.log(resolve);
})
.catch ((error) => {
    console.log(error);
});

