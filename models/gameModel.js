const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');

const Game = sequelize.define('game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    homeTeam: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    awayTeam: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hasStarted: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    hasFinished: {
        type: DataTypes.BOOLEAN,
        default: false
    }
})

module.exports = Game;