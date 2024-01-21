const { DataTypes } = require('sequelize');

const sequelize = require('../DB/config'); 

const Material = sequelize.define('Material', {
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


module.exports = Material;