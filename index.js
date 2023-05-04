const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { connectDB, sequelize } = require('./config/db');

// Connecting to the mySQL databsae
//connectDB()

let browser;

const leagues = 'https://tipster.bg/statistika';

async function main() {
    browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto(leagues, { waitUntil: 'networkidle2' })
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(html);
    const countries = $('.llong').map((index, element) => {
        return ($(element).text().split(' - ')[0]);
    }).get();

    console.log(countries);
}

main();