const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const { sequelize } = require('../config/db');

const Team = sequelize.define('team', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Team;