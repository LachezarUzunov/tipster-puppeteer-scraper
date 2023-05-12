const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');
const Country = require('./models/countryModel');
const Team = require('./models/teamsModel');
const League = require('./models/leaguesModel');
const Game = require('./models/gameModel');
const StandardMarket = require('./models/marketsModels/standardMarketModel');
const DoubleChanceMarket = require('./models/marketsModels/doubleChanceModel');
const DrawNoBetMarket = require('./models/marketsModels/drawNoBetModel');
const GoalGoalMarket = require('./models/marketsModels/goalGoalModel');
const OverUnderMarket = require('./models/marketsModels/overUnderModel');
const { scrapingCountries } = require('./scraping/scrapingCountries');
const { scrapingLeagues } = require('./scraping/scrapingLeagues');
const { scrapingTeams } = require('./scraping/scrapingTeam');
const { scrapingGames } = require('./scraping/scrapingGames');
const { scrapingMarket } = require('./scraping/scrapingMarket');
const { scrapingDoubleChance } = require('./scraping/scrapingDoubleChanceMarket');
const { scrapingDrawNoBet } = require('./scraping/scrapingDrawNoBetMarket');
const { scrapingGoalGoal } = require('./scraping/scrapingGoalGoalMarket');
const { scrapingOverUnder } = require('./scraping/scrapingOverUnderMarket');

// Connecting to the mySQL databsae
connectDB()
let browser;

const url = 'https://tipster.bg/statistika';
const secondUrl = 'https://tipster.bg'

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

async function gettingLeagueUrls(url, page) {
    await page.goto(url, { waitUntil: 'networkidle2' })
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    
    const leagueUrls = $('.dce').map((index, element) => {
        return 'https://tipster.bg' + ($(element).find('a').attr('href'))
    }).get();
    leagueUrls.shift();
    return leagueUrls;
}

// Scraping countries, leagues and teams
async function main () {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const leagueUrls = await gettingLeagueUrls(url, page);
    const leagueCountries = [];

    // 1. Scraping countries
  // await scrapingCountries(url, page)
    // 2. Scraping leagues
    // for (let i = 0; i < leagueUrls.length; i++) {
    //     const { currentLeague, currentCountry } = await scrapingLeagues(leagueUrls[i], page);
    //     console.log(currentLeague, currentCountry)
    //     leagueCountries.push({
    //         currentLeague,
    //         currentCountry
    //     });
    //     sleep(200)
    // }
    // 3. Scraping teams
    // for (let i = 0; i < leagueUrls.length; i++) {
    //     await scrapingTeams(leagueUrls[i], page, leagueCountries[i].currentLeague, leagueCountries[i].currentCountry);
    // }
}
//main()

 async function gettingGamesUrls(page) {
    await page.goto(secondUrl, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    
    const gameUrls = $('.game').map((index, element) => {
         return 'https://tipster.bg' + ($(element).attr('href'))
    }).get();

    return gameUrls;
 }


 async function gettingFixtures() {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const gameUrls = await gettingGamesUrls(page)

    for (let i = 0; i < gameUrls.length; i++) {
        
        const { time, homeTeam, awayTeam } = await scrapingGames(gameUrls[i], page);
       // console.log(time, homeTeam, awayTeam);
       // await scrapingMarket(gameUrls[i], page, time, homeTeam, awayTeam);
       // await scrapingDoubleChance(gameUrls[i], page, time, homeTeam, awayTeam);
       // await scrapingDrawNoBet(gameUrls[i], page, time, homeTeam, awayTeam);
       // await scrapingGoalGoal(gameUrls[i], page, time, homeTeam, awayTeam);
        await scrapingOverUnder(gameUrls[i], page, time, homeTeam, awayTeam);
    }   
 }

 gettingFixtures();

// Setting up database relations
Country.hasMany(League);
League.belongsTo(Country);

League.hasMany(Team);
Team.belongsTo(League);

League.hasMany(Game);
Game.belongsTo(League);

Game.hasOne(StandardMarket);
StandardMarket.belongsTo(Game);

Game.hasOne(DoubleChanceMarket);
DoubleChanceMarket.belongsTo(Game);

Game.hasOne(DrawNoBetMarket);
DrawNoBetMarket.belongsTo(Game);

Game.hasOne(GoalGoalMarket);
GoalGoalMarket.belongsTo(Game);

Game.hasOne(OverUnderMarket);
OverUnderMarket.belongsTo(Game);

const createTable = async () => {
    try {
        const res = await sequelize.sync({ alter: true });
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}
//createTable();
