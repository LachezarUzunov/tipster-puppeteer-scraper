const cheerio = require('cheerio');

async function scrapingGames (leagueUrl, page) {
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingGames
}