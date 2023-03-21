// cantidad total de links
const totalLinks = (links) => {
    const total = links.length;
    return total;
}

// cantidad de links únicos
const unique = (links) => {
    const hrefs = links.map(link => link.href);
    const uniqueHrefs = new Set(hrefs);
    return uniqueHrefs.size;
}

// cantidad de links rotos (fail)
const broken = (links) => {
    const failMessage = links.filter(link => link.message === 'fail');
    const uniqueFails = new Set(failMessage);
    return uniqueFails.size;
}

module.exports = {
    totalLinks,
    unique,
    broken,
}