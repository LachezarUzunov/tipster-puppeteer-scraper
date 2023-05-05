const cheerio = require('cheerio');
const { savingTeams } = require('../controller/FixturesController');

async function scrapingTeams(leagueUrl, page, league) {
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const teams = $('.module-links').find("a").map((index, element) => {
            return ($(element).text())
        }).get();
        
        // Saving teams to leagues
        teams.forEach(team => savingTeams(team, league))
       
        return leagueAndTeams;       
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingTeams
}