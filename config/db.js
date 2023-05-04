const Sequelize = require('sequelize');

const sequelize = new Sequelize('tipster', 'root', process.env.PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Success')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB, sequelize }