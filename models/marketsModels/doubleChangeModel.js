const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../../config/db');

const DoubleChanceMarket = sequelize.define('doubleChangeMarket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    homeOrDraw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    homeOrAway: {
        type: DataTypes.STRING,
        alloNull: false,
        validate: {
            notEmpty: true
        }
    },
    drawOrAway: {
        type: DataTypes.STRING,
        alloNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = DoubleChanceMarket;