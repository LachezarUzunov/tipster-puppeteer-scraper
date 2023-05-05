const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../../config/db');

const StandardMarket = sequelize.define('standardMarket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    homeTeamWins: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    draw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    awayTeamWins: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = StandardMarket;