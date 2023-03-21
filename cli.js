#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const cliFunctions = require('./cli-functions.js');
const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');
const help = process.argv.includes('--help') || process.argv.includes('--h');
const options = { validate, stats };

if (help) {
    console.log('-------------------------------------------------------------------------');
    console.log('\nUsage: md-links <path> [--validate] [--stats]');
    console.log('\n-------------------------------------------------------------------------');
    console.log('\nOptions:');
    console.log('\n--validate             Show the status of all the links');
    console.log('--stats                Show statistics: Total & Unique links');
    console.log('--stats --validate     Show statistics: Total, Unique and Broken links');
    console.log('--validate --stats     Show statistics: Total, Unique and Broken links');
    console.log('\n-------------------------------------------------------------------------');
    console.log('\nIf you do not include an option, you will get all links:\nhref, tittle and file path');
    console.log('\n-------------------------------------------------------------------------');
    process.exit();
}

mdLinks(path, options)
    .then((linksResult) => {
        if (stats && validate) {
            console.log('-------------------------------------------------------------------------');
            console.log(`Total: ${cliFunctions.totalLinks(linksResult)}`);
            console.log(`Unique: ${cliFunctions.unique(linksResult)}`);
            console.log(`Broken: ${cliFunctions.broken(linksResult)}`);
            console.log('-------------------------------------------------------------------------');
        } else if (validate) {
            console.log('-------------------------------------------------------------------------');
            console.log(linksResult);
            console.log('-------------------------------------------------------------------------');
        } else if (stats) {
            console.log('-------------------------------------------------------------------------');
            console.log(`Total: ${cliFunctions.totalLinks(linksResult)}`);
            console.log(`Unique: ${cliFunctions.unique(linksResult)}`);
            console.log('-------------------------------------------------------------------------');
        } else {
            console.log('-------------------------------------------------------------------------');
            console.log(linksResult);
            console.log('-------------------------------------------------------------------------');
        }
    })
    .catch((error) => {
        console.log(error);
    });
