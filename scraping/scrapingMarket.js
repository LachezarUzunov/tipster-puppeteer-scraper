const cheerio = require('cheerio');

async function scrapingMarket (url, page) {
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingMarket
}