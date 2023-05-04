const Country = require('../models/countryModel');

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

module.exports = {
    savingCountries
}