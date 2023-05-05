const cheerio = require('cheerio')

async function scrapingLeagues (leagueUrl, page) {
    let leagueResults = []
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

        return {
            league: league[0],
            country: country[1]
        }        
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingLeagues
}