const cheerio = require('cheerio');
const { getGame } = require('../controller/fixturesController');
const { savingDrawNoBetMarket } = require('../controller/marketsController');

async function scrapingDrawNoBet (url, page, time, homeTeam, awayTeam) {
    let gameId = ''
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[2]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();
        const home = odds[0];
        const away = odds[1];
    
        const game = await getGame(time, homeTeam, awayTeam);
        if (game) {
            gameId = game.id
        }

        if (gameId !== '') {
            await savingDrawNoBetMarket(home, away, gameId)
        }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingDrawNoBet
}