const cheerio = require('cheerio');
const { getGame } = require('../controller/fixturesController');

async function scrapingOverUnder (url, page, time, homeTeam, awayTeam) {
    let gameId = ''
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[3]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();
        const over15 = odds[0];
        const under15 = odds[1];
        const over25 = odds[2];
        const under25 = odds[3];
        const over35 = odds[4];
        const under35 = odds[5];
    
        const game = await getGame(time, homeTeam, awayTeam);
        if (game) {
            gameId = game.id
        }

        if (gameId !== '') {
            await s(over15, under15, over25, under25, over35, under35)
        }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingOverUnder
}