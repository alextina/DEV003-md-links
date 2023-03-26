#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const cliFunctions = require('./cli-functions.js');
const colors = require('colors');
const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');
const help = process.argv.includes('--help') || process.argv.includes('--h');
const options = { validate, stats };

if (help) {
    console.log('');
    console.log(`\n${'★'.grey} Usage: ${'md-links <path>'.cyan} ${'[--validate] [--stats]'.green}`);
    console.log(`\n${'★'.grey} Options:`);
    console.log(`\nIf you run: ${'md-links <path>'.cyan} ${'(no option)'.green}`);
    console.log('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'.grey);
    console.log(`
    ${'★'.grey} href   ${'>>'.grey}   URL found
    ${'★'.grey} text   ${'>>'.grey}   Text that appeared inside the link.
    ${'★'.grey} file   ${'>>'.grey}   Path of the file where the link was found.`);
    console.log('\n');
    console.log(`If you run: ${'md-links <path>'.cyan} ${'--validate'.green}`);
    console.log('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'.grey);
    console.log(`
    ${'★'.grey} href   ${'>>'.grey}   URL found.
    ${'★'.grey} text   ${'>>'.grey}   Text that appeared inside the link.
    ${'★'.grey} file   ${'>>'.grey}   Path of the file where the link was found.
    ${'★'.grey} status ${'>>'.grey}   HTTP response code.
    ${'★'.grey} ok     ${'>>'.grey}   ${'"fail"'.red} message in case of failure, or ${'"ok"'.green} in case of success.`);
    console.log('\n');
    console.log(`If you run: ${'md-links <path>'.cyan} ${'--stats'.green}`);
    console.log('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'.grey);
    console.log(`
    ${'★'.grey} Total  ${'>>'.grey}    Total number of links.
    ${'★'.grey} Unique ${'>>'.grey}    Number of unique links.`);
    console.log('\n');
    console.log(`If you run: ${'md-links <path>'.cyan} ${'--stats --validate'.green}`);
    console.log('¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'.grey);
    console.log(`
    ${'★'.grey} Total  ${'>>'.grey}    Total number of links.
    ${'★'.grey} Unique ${'>>'.grey}    Number of unique links.
    ${'★'.grey} Broken ${'>>'.grey}    Number of broken links.`);
    console.log('');
    process.exit();
}

mdLinks(path, options)
    .then((linksResult) => {
        if (stats && validate) {
            console.log('\n');
            console.log(`Stats of the links found in ${path} :`);
            console.log('-------------------------------------------------------------------------'.grey);
            console.log('');
            console.log(`   ${'★'.grey} Total   ${'>>'.grey}    ${colors.green(cliFunctions.totalLinks(linksResult))}`);
            console.log(`   ${'★'.grey} Unique  ${'>>'.grey}    ${colors.green(cliFunctions.unique(linksResult))}`);
            console.log(`   ${'★'.grey} Broken  ${'>>'.grey}    ${colors.red(cliFunctions.broken(linksResult))}`);
            console.log('');
        } else if (validate) {
            console.log('\n');
            console.log(`All validated links found in ${path} :`);
            console.log('-------------------------------------------------------------------------'.grey);
            linksResult.forEach(linkresult => {
                console.log('');
                console.log(`   ${'★'.grey} href     ${'>>'.grey}    ${colors.green(linkresult.href)}`);
                console.log(`   ${'★'.grey} text     ${'>>'.grey}    ${colors.green(linkresult.text)}`);
                console.log(`   ${'★'.grey} file     ${'>>'.grey}    ${colors.green(linkresult.file)}`);
                console.log(`   ${'★'.grey} status   ${'>>'.grey}    ${colors.yellow(linkresult.status)}`);
                console.log(`   ${'★'.grey} ok       ${'>>'.grey}    ${linkresult.ok === 'ok' ? colors.green( linkresult.ok ) : colors.red( linkresult.ok )}`);;
            });
            console.log('');
        } else if (stats) {
            console.log('\n');
            console.log(`Stats of the links found in ${path} :`);
            console.log('-------------------------------------------------------------------------'.grey);
            console.log('');
            console.log(`   ${'★'.grey} Total   ${'>>'.grey}    ${colors.green(cliFunctions.totalLinks(linksResult))}`);
            console.log(`   ${'★'.grey} Unique  ${'>>'.grey}    ${colors.green(cliFunctions.unique(linksResult))}`);
            console.log('');
        } else {
            console.log('\n');
            console.log(`All links found in ${path}:`);
            console.log('-------------------------------------------------------------------------'.grey);
            linksResult.forEach(linkresult => {
                console.log('');
                console.log(`   ${'★'.grey} href     ${'>>'.grey}    ${colors.green(linkresult.href)}`);
                console.log(`   ${'★'.grey} text     ${'>>'.grey}    ${colors.green(linkresult.text)}`);
                console.log(`   ${'★'.grey} file     ${'>>'.grey}    ${colors.green(linkresult.file)}`);
            });
            console.log('');
        }
    })
    .catch((error) => {
        console.log(error);
    });
