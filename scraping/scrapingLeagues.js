const cheerio = require('cheerio');
const { savingLeagues, getCountry } = require('../controller/FixturesController');

async function scrapingLeagues (leagueUrl, page) {
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const text = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        let currentLeague
        if (text.length > 2) {
            currentLeague = text[0] + ' ' + text[1]
        } else {
            currentLeague = text[0].trim();
        }
        
        const currentCountry = text[text.length - 1].trim();

        const country = await getCountry(currentCountry);
        const countryId = country.id;

        console.log(currentLeague, countryId)
        await savingLeagues(currentLeague, countryId)    
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingLeagues
}