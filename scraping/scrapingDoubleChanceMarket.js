const cheerio = require('cheerio');
const { getGame } = require('../controller/fixturesController');

async function scrapingDoubleChance (url, page, time, homeTeam, awayTeam) {
    let gameId = ''
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[1]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();
        const homeOrDraw = odds[0];
        const homeOrAway = odds[1];
        const drawOrAway = odds[2];
    
        const game = await getGame(time, homeTeam, awayTeam);
        if (game) {
            gameId = game.id
        }

        if (gameId !== '') {
            await savingStandartMarket(homeOrDraw, homeOrAway, drawOrAway, gameId)
        }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingDoubleChance
}