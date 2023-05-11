const cheerio = require('cheerio');

async function scrapingMarket (url, page, time, homeTeam, awayTeam) {
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);
        const odds = $($('.odds')[0]).find('.odd').map((index, element) => {
            return ($(element).text())
        }).get();

        console.log(odds);
     
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingMarket
}