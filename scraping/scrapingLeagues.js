const cheerio = require('cheerio');
const { savingLeagues } = require('../controller/FixturesController');

async function scrapingLeagues (leagueUrl, page) {
 //   console.log(leagueUrl);
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
        
        const currentCountry = text[text.length - 1]
        console.log(currentLeague, currentCountry)
        await savingLeagues(currentLeague, currentCountry)

        return currentLeague       
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingLeagues
}