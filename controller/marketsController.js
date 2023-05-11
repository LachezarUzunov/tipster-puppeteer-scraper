const DoubleChanceMarket = require('../models/marketsModels/doubleChangeModel');
const StandardMarket = require('../models/marketsModels/standardMarketModel');

// Saving 1,X,2 market
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

// Saving Double chance - 1X, 12, X2
const savingDoubleChanceMarket = async (homeOrDraw, homeOrAway, drawOrAway, gameId) => {
    try {
        // find if odds are recorded already
        const existingMarket = await DoubleChanceMarket.findOne({
            where: {
                gameId: gameId
            }
        })

        // Update odds
        if (existingMarket) {
            await existingMarket.update({
                homeOrDraw: homeOrDraw,
                homeOrAway: homeOrAway,
                drawOrAway: drawOrAway
            }, {
                where: {
                    gameId: gameId
                }
            })
            return existingMarket;
        }

        const doubleChanceMarket = await DoubleChanceMarket.create({
            homeOrDraw: homeOrDraw,
            homeOrAway: homeOrAway,
            drawOrAway: drawOrAway,
            gameId: gameId,
        })

            return doubleChanceMarket;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    savingStandartMarket,
    savingDoubleChanceMarket
}