const cheerio = require('cheerio');

async function scrapingMarket (url, page) {
    try {
        await page.goto(url, { waitUntil: "networkidle2" });
        const html = await page.evaluate(() => document.body.innerHTML);
        const $ = cheerio.load(html);

        const text = $('.standing-title').map((index, element) => {
            return $(element).text().split(' - ');
        }).get();

        let currentLeague
        if (text.length > 2) {
            currentLeague = text[0] + ' ' + text[1]
        } else {
            currentLeague = text[0];
        }

        const currentCountry = text[text.length - 1]
        await savingLeagues(currentLeague, currentCountry)

        return currentLeague       
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    scrapingMarket
}