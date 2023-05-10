const cheerio = require('cheerio');

async function scrapingGames (matchUrl, page) {
    let hasStarted = false
    try {
        await page.goto(matchUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const homeTeam = $('.team-flag-home').find('h2').text();
        const awayTeam = $('.team-flag-away').find('h2').text();
        const time = $('#time').attr('content');
        const liveScore = $('.live-score').text();

        if (liveScore.length > 0) {
            hasStarted = true;
        }
        console.log(homeTeam, awayTeam, time, hasStarted)
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingGames
}