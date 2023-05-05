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

        await Country.create({
            country: country
        })

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
const savingLeagues = async (league, country) => {
   // console.log(league, country)
    try {
        const existingCountry = await Country.findOne({
            where: {
                country : country
            }
        })

       if (existingCountry) {
            const existingLeague = await League.findOne({
                where: {
                    league: league,
                   // countryId: existingCountry.id
                }
            })

            if (existingLeague) {
                throw 'Лигата съществува'
            }
               
            await League.create({
            league: league,
            countryId: existingCountry.id
            })
       }
    } catch (error) {
        console.log(error)
    }
}

// Saving teams to leagues
const savingTeams = async (team, league) => {
    try {
        // find if league exists db
        const leagueExists = await League.findOne({
            where: {
                league: league,
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

module.exports = {
    savingCountries,
    savingLeagues,
    savingTeams
}