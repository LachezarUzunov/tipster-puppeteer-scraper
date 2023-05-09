const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');
const Country = require('./models/countryModel');
const Team = require('./models/teamsModel');
const League = require('./models/leaguesModel');
const Game = require('./models/gameModel');
const StandardMarket = require('./models/marketsModels/standardMarketModel');
const { scrapingCountries } = require('./scraping/scrapingCountries');
const { scrapingLeagues } = require('./scraping/scrapingLeagues');
const { scrapingTeams } = require('./scraping/scrapingTeam');
const { scrapingGames } = require('./scraping/scrapingGames');

// Connecting to the mySQL databsae
connectDB()
let browser;

const url = 'https://tipster.bg/statistika';
const secondUrl = 'https://tipster.bg'

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

async function main () {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 1. Scraping countries
   // await scrapingCountries(url, page)
    // 2. Scraping leagues
   await leagues(url, page)
}
main()

// 2. Scraping leagues
 async function leagues(url, page) {
    try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const leagueUrls = $('.dce').map((index, element) => {
            return 'https://tipster.bg' + ($(element).find('a').attr('href'))
        }).get();
        leagueUrls.shift();
        console.log('number of leagues', leagueUrls.length)
    
        for (let i = 0; i < leagueUrls.length; i++) {
            await scrapingLeagues(leagueUrls[i], page);
            sleep(200)
        }
    } catch (error) {
        console.log(error)
    }
}

 async function gamesUrls() {
    let gamesUrls
    await page.goto(secondUrl, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    await scrapingGames(secondUrl, page);
 }


// Setting up database relations
Country.hasMany(League);
League.belongsTo(Country);

League.hasMany(Team);
Team.belongsTo(League);

League.hasMany(Game);
Game.belongsTo(League);

Game.hasOne(StandardMarket)
StandardMarket.belongsTo(Game)

const createTable = async () => {
    try {
        const res = await sequelize.sync({ alter: true });
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}
//createTable();
