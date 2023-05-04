const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');

const League = sequelize.define('league', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    league: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = League;