const { DataTypes } = require('sequelize');

const sequelize = require('../DB/config'); 

const Color = sequelize.define('Color', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});


module.exports = Color;