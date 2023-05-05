const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const { connectDB, sequelize } = require('./config/db');
const Country = require('./models/countryModel');
const Team = require('./models/teamsModel');
const League = require('./models/leaguesModel');
const { scrapingCountries } = require('./scraping/scrapingCountries');
const { scrapingLeagues } = require('./scraping/scrapingLeagues');
const { scrapingTeams } = require('./scraping/scrapingTeam');

// Connecting to the mySQL databsae
connectDB()

let browser;

const url = 'https://tipster.bg/statistika';

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

async function main() {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Scraping countries and getting league URLs
    const leagueUrls = await scrapingCountries(url, browser)

    // Scraping leagues and teams for each league URL;
    for (let i = 1; i < leagueUrls.length; i++) {
       const league = await scrapingLeagues(leagueUrls[i], page);
      // await scrapingTeams(leagueUrls[i], page, league);

       await sleep(300);
    }
 }


// Setting up database relations
Country.hasMany(League, { as: 'leagues'});
League.belongsTo(Country, {
    foreignKey: 'id',
});

League.hasMany(Team, { as: 'teams '});
Team.belongsTo(League, {
    foreignKey: 'id',
})

//main();

const createTable = async () => {
    try {
        const res = await Team.sync();
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}
createTable();