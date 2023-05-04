const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');
const Country = require('./models/countryModel');
const Team = require('./models/TeamsModel');
const League = require('./models/leaguesModel');
const { savingCountries, savingLeagues } = require('./controller/FixturesController');

// Connecting to the mySQL databsae
//connectDB()

let browser;

const url = 'https://tipster.bg/statistika';

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

async function scrapingLeagues (leagueUrl, page) {
    let leagueResults = []
    try {
        await page.goto(leagueUrl, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const league = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        const country = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        return {
            league: league[0],
            country: country[1]
        }        
    } catch (error) {
        console.log(error)
    }
    
}

async function scrapingCountries(url) {
    let countries = []
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' })
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
    
        const countriesResult = $('.llong').map((index, element) => {
            return ($(element).text().split(' - ')[0]);
        }).get();
    
        const leagueUrls = $('.dce').map((index, element) => {
            return 'https://tipster.bg' + ($(element).find('a').attr('href'))
        }).get();
    
        countries = countriesResult.filter((c, i) => c !== countriesResult[i + 1]);
        return leagueUrls;
        // ----- Saving countries to database --------- //
        //countries.forEach(c => savingCountries(c));
    } catch (error) {
        console.log(error)
    }
}

async function main() {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const leagueUrls = await scrapingCountries(url)
    let leaguesCountries = []
    for (let i = 1; i < leagueUrls.length; i++) {
       const league = await scrapingLeagues(leagueUrls[i], page);
       leaguesCountries.push(league);
       await sleep(300);
    }

    leaguesCountries.forEach(l => savingLeagues(l));
   // console.log(leaguesCountries)
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

main();

const createTable = async () => {
    try {
        const res = await Team.sync();
        console.log('Table and model synced successfully')
    } catch (err) {
        console.log('Error syncing the table and the model')
    }
}
createTable();