const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../../config/db');

const DrawNoBetMarket = sequelize.define('drawNoBetMarket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    home: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    away: {
        type: DataTypes.STRING,
        alloNull: false,
        validate: {
            notEmpty: true
        }
    },
})

module.exports = DrawNoBetMarket;