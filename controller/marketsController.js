const StandardMarket = require('../models/marketsModels/standardMarketModel');


const savingStandartMarket = async (homeTeamWins, draw, awayTeamWins, gameId) => {
    try {
        // find if odds are recorded already
        const existingMarket = await StandardMarket.findOne({
            where: {
                gameId: gameId
            }
        })

        // Update odds
        if (existingMarket) {
            await existingMarket.update({
                homeTeamWins: homeTeamWins,
                draw: draw,
                awayTeamWins: awayTeamWins
            }, {
                where: {
                    gameId: gameId
                }
            })
            return existingMarket;
        }

        const standartMarket = await StandardMarket.create({
            homeTeamWins: homeTeamWins,
            draw: draw,
            awayTeamWins: awayTeamWins,
            gameId: gameId,
        })

            return standartMarket;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    savingStandartMarket
}