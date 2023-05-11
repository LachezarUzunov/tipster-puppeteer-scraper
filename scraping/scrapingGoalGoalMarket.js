const cheerio = require('cheerio');
const { getGame } = require('../controller/fixturesController');
const { savingGoalGoalMarket } = require('../controller/marketsController');

async function scrapingGoalGoal (url, page, time, homeTeam, awayTeam) {
    let gameId = ''
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[4]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();
        const yes = odds[0];
        const no = odds[1];
    
        const game = await getGame(time, homeTeam, awayTeam);
        if (game) {
            gameId = game.id
        }

        if (gameId !== '') {
            await savingGoalGoalMarket(yes, no, gameId)
        }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingGoalGoal
}