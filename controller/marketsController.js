const DoubleChanceMarket = require('../models/marketsModels/doubleChanceModel');
const DrawNoBetMarket = require('../models/marketsModels/drawNoBetModel');
const GoalGoalMarket = require('../models/marketsModels/goalGoalModel');
const OverUnderMarket = require('../models/marketsModels/overUnderModel');
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

// Saving DrawNoBet market - 1, 2
const savingDrawNoBetMarket = async (home, away, gameId) => {
    try {
        // find if odds are recorded already
        const existingMarket = await DrawNoBetMarket.findOne({
            where: {
                gameId: gameId
            }
        })

        // Update odds
        if (existingMarket) {
            await existingMarket.update({
                home: home,
                away: away,
            }, {
                where: {
                    gameId: gameId
                }
            })
            return existingMarket;
        }

        const drawNoBetMarket = await DrawNoBetMarket.create({
            home: home,
            away: away,
            gameId: gameId,
        })

            return drawNoBetMarket;

    } catch (error) {
        console.log(error)
    }
}

// Saving Goal Goal/ No Goal
const savingGoalGoalMarket = async (yes, no, gameId) => {
    try {
        // find if odds are recorded already
        const existingMarket = await GoalGoalMarket.findOne({
            where: {
                gameId: gameId
            }
        })

        // Update odds
        if (existingMarket) {
            await existingMarket.update({
                yes: yes,
                no: no,
            }, {
                where: {
                    gameId: gameId
                }
            })
            return existingMarket;
        }

        const goalGoalMarket = await GoalGoalMarket.create({
            yes: yes,
            no: no,
            gameId: gameId,
        })

            return goalGoalMarket;

    } catch (error) {
        console.log(error)
    }
}

// Saving Over Under market odds
const savingOverUnderMarket = async (over15, under15, over25, under25, over35, under35, gameId) => {
    try {
        // find if odds are recorded already
        const existingMarket = await OverUnderMarket.findOne({
            where: {
                gameId: gameId
            }
        })

        // Update odds
        if (existingMarket) {
            await existingMarket.update({
                over15: over15,
                under15: under15,
                over25: over25,
                under25: under25,
                over35: over35,
                under35: under35
            }, {
                where: {
                    gameId: gameId
                }
            })
            return existingMarket;
        }

        const overUnderMarket = await OverUnderMarket.create({
            over15: over15,
            under15: under15,
            over25: over25,
            under25: under25,
            over35: over35,
            under35: under35,
            gameId: gameId,
        })

            return overUnderMarket;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    savingStandartMarket,
    savingDoubleChanceMarket,
    savingDrawNoBetMarket,
    savingGoalGoalMarket,
    savingOverUnderMarket
}