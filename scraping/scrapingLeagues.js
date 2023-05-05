const cheerio = require('cheerio');
const { savingLeagues } = require('../controller/FixturesController');

async function scrapingLeagues (leagueUrl, page) {
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const league = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        const country = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        const currentLeague = league[0];
        const currentCountry = country[1]

        await savingLeagues(currentLeague, currentCountry)

        return { currentLeague }        
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingLeagues
}