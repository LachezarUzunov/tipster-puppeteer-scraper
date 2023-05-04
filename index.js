const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');
const Country = require('./models/countryModel');
const Team = require('./models/TeamsModel');
const League = require('./models/leaguesModel');
const { savingCountries } = require('./controller/FixturesController');

// Connecting to the mySQL databsae
//connectDB()

let browser;

const url = 'https://tipster.bg/statistika';

async function main() {
    let countries = []
    browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' })
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    const countriesResult = $('.llong').map((index, element) => {
        return ($(element).text().split(' - ')[0]);
    }).get();

    // const leagues = $('.llong').map((index, element) => {
    //     return ($(element).text().split(' - ')[1]);
    // }).get();

    countries = countriesResult.filter((c, i) => c !== countriesResult[i + 1]);
  //  console.log(countries);
//     const countryLeague = countriesResult.map((c, i) => {
//         return {
//             country: c,
//             league: leagues[i]
//         }
//     })
//     console.log(countryLeague)

countries.forEach(c => savingCountries(c));
console.log(countries)
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