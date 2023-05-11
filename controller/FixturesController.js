const Country = require('../models/countryModel');
const Game = require('../models/gameModel');
const League = require('../models/leaguesModel');
const Team = require('../models/teamsModel');

// Saving countries to database
const savingCountries = async (country) => {

    try {
        const countryExists = await Country.findOne({
            where: {
                country: country
            }
        })

        if (countryExists) {
            throw ('Country exists in the database')
        }

        await Country.create({
            country: country
        })

    } catch (error) {
        console.log(error)
    }
}

// Get country by name
const getCountry = async (country) => {
    try {
        const currentCountry = Country.findOne({
            where: {
                country: country
            }
        })

        return currentCountry;
    } catch (error) {
        console.log(error)
    }
}

// Get League bu CountryID and leagueName
const getLeague = async (countryId, leagueName) => {
    try {
        const league = League.findOne({
            where: {
                league: leagueName,
                countryId: countryId
            }
        })

        return league;
    } catch (error) {
        console.log(error)
    }
}

// Get League bu CountryID and leagueName
const getGame = async (homeTeam, awayTeam, time) => {
    try {
        const game = Game.findOne({
            where: {
                time: time,
                homeTeam: homeTeam,
                awayTeam: awayTeam
            }
        })

        return game;
    } catch (error) {
        console.log(error)
    }
}

// Saving leagues to database with ID of the country
const savingLeagues = async (league, countryId) => {
    try {
            const existingLeague = await League.findOne({
                where: {
                    league: league,
                    countryId: countryId
                }
            })

            if (existingLeague) {
                throw 'Лигата съществува'
            }
            
             await League.create({
             league: league,
             countryId: countryId
             })
    } catch (error) {
        console.log(error)
    }
}

// Saving teams to leagues
const savingTeams = async (team, league, countryId) => {
    try {
        // find if league exists db
        const leagueExists = await League.findOne({
            where: {
                league: league,
                countryId: countryId
            }
        })

        if (leagueExists) {
            const teamExists = await Team.findOne({
                where: {
                    team: team
                }
            })

                if (teamExists) {
                  throw 'Отборът вече е добавен'
                }

                await Team.create({
                    team: team,
                    leagueId: leagueExists.id
                })
            }
    } catch (error) {
        console.log(error);
    }
}

const savingGames = async (time, homeTeam, awayTeam, hasStarted, hasFinished, leagueId) => {
    try {
        // find if match is recorded already
        const existingGame = await Game.findOne({
            where: {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                time: time
            }
        })

        if (existingGame) {
            throw 'Game recorded already'
        }

        const game = await Game.create({
            time: time,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            hasStarted: hasStarted,
            hasFinished: hasFinished,
            leagueId: leagueId
        })

        return game.id;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    savingCountries,
    savingLeagues,
    savingTeams,
    getCountry,
    savingGames,
    getLeague,
    getGame
}