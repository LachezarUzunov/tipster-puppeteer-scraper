const cheerio = require('cheerio');
const { savingTeams, getCountry } = require('../controller/fixturesController');

async function scrapingTeams(leagueUrl, page, league, country) {
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const teams = $('.module-links').find("a").map((index, element) => {
            return ($(element).text())
        }).get();

        const currentCountry = await getCountry(country);
        const countryId = currentCountry.id;
    
        // Saving teams to leagues
        for (let i = 0; i < teams.length; i++) {
            await savingTeams(teams[i], league, countryId)
        }
        return teams;       
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingTeams
}