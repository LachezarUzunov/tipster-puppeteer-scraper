const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../../config/db');

const GoalGoalMarket = sequelize.define('goalGoalMarket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    yes: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = GoalGoalMarket;