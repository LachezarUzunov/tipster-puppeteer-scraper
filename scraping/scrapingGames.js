const cheerio = require('cheerio');
const { getCountry, savingGames, getLeague } = require('../controller/fixturesController');

async function scrapingGames (matchUrl, page) {
    let hasStarted = false;
    let hasFinished = false;
    let leagueName;
    let country;
    let countryId = '';
    let leagueId = '';
    let gameId = '';
    try {
        await page.goto(matchUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const homeTeam = $('.team-flag-home').find('h2').text();
        const awayTeam = $('.team-flag-away').find('h2').text();
        const time = $('#time').attr('content');
        const liveScore = $('.live-score').text();
        const gameResult = $('.game-result').text();
        const leagueText = $('#title').text();
        const splittedLeague = leagueText.split(' - ');

        if (splittedLeague.length == 1) {
            leagueName = 'Not Applicable',
            country = 'International'
        } else {
            country = splittedLeague[0];
            const leagueNameText = splittedLeague[1].split(' ');
            leagueNameText.pop();
            leagueName = leagueNameText.join(' ');
        }

        if (liveScore.length > 0 || gameResult.length > 0) {
            hasStarted = true;
        }

        if (gameResult.length > 0) {
            hasFinished = true;
        }

        if (country !== 'International') {
            const currentCountry = await getCountry(country);
            countryId = currentCountry.id;
        }

        if (countryId !== '') {
            const league = await getLeague(countryId, leagueName)
            if (league) {
                leagueId = league.id
            } 
        }

        if (leagueId !== '') {
           // gameId = await savingGames(time, homeTeam, awayTeam, hasStarted, hasFinished, leagueId)
        }
       
        if (gameId !== '') {
            return gameId;
        }

        return { time, homeTeam, awayTeam }
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingGames
}