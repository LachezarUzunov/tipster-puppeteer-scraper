const cheerio = require('cheerio');
const { getGame } = require('../controller/fixturesController');
const { savingStandartMarket } = require('../controller/marketsController');

async function scrapingMarket (url, page, time, homeTeam, awayTeam) {
    let gameId = ''
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[0]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();
        const homeTeamWins = odds[0];
        const draw = odds[1];
        const awayTeamWins = odds[2];
        console.log(time, homeTeam, awayTeam)
        const game = await getGame(time, homeTeam, awayTeam);
        if (game) {
            gameId = game.id
            console.log(gameId)
        }

        if (gameId !== '') {
            await savingStandartMarket(homeTeamWins, draw, awayTeamWins, gameId)
        }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingMarket
}