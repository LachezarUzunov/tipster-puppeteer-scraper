const cheerio = require('cheerio');
const { savingCountries } = require('../controller/FixturesController');

async function scrapingCountries(url, browser) {
    let countries = []
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' })
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
    
        const countriesResult = $('.llong').map((index, element) => {
            return ($(element).text().split(' - ')[0]);
        }).get();
    
        const leagueUrls = $('.dce').map((index, element) => {
            return 'https://tipster.bg' + ($(element).find('a').attr('href'))
        }).get();
    
        countries = countriesResult.filter((c, i) => c !== countriesResult[i + 1]);
        // ----- Saving countries to database --------- //
        //countries.forEach(c => savingCountries(c));
        leagueUrls.shift();
        return leagueUrls;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    scrapingCountries
}