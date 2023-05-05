const Country = require('../models/countryModel');
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

        const newCountry = await Country.create({
            country: country
        })

        console.log(newCountry);
    } catch (error) {
        console.log(error)
    }
}

// Get country by name 
// const getCountry = async (country) => {
//     try {
//         const currentCountry = Country.findOne({
//             where: {
//                 country: country
//             }
//         })

//         return currentCountry;
//     } catch (error) {
//         console.log(error)
//     }
// }

// Saving leagues to database with ID of the country
const savingLeagues = async (leagueCountry) => {

    try {
        const existingCountry = await Country.findOne({
            where: {
                country : leagueCountry.country
            }
        })

        if (existingCountry) {
            const existingLeague = await League.findOne({
                where: {
                    league: leagueCountry.league
                }
            })

            if (!existingLeague) {
                const newLeague = await League.create({
                    league: leagueCountry.league,
                    countryId: existingCountry.id
                })
            } 
        }
    } catch (error) {
        console.log(error)
    }
}

// Saving teams to leagues
const savingTeams = async (leagueAndTeams) => {
    try {
        // find if league exists db
        const leagueExists = await League.findOne({
            where: {
                league: leagueAndTeams.league
            }
        })

        if (leagueExists) {
            leagueAndTeams.teams.forEach(async (t) => {
             // find if team exists in db
                const teamExists = await Team.findOne({
                    where: {
                        team: t
                    }
                })

                if (!teamExists) {
                    await Team.create({
                        team: t,
                        leagueId: leagueExists.id
                    })
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    savingCountries,
    savingLeagues,
    savingTeams
}