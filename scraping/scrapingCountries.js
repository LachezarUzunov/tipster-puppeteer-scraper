const cheerio = require('cheerio');
const { savingCountries } = require('../controller/FixturesController');

async function scrapingCountries(url, page) {
    let countries = []
    try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
    
        const countriesResult = $('.llong').map((index, element) => {
            return ($(element).text().split(' - ')[0]);
        }).get();
    
        countries = countriesResult.filter((c, i) => c !== countriesResult[i + 1]);
        // ----- Saving countries to database --------- //
        for (let i = 0; i < countries.length; i++) {
            await savingCountries(countries[i]);
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    scrapingCountries
}