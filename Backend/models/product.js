const { DataTypes } = require('sequelize');

const sequelize = require('../DB/config');
const Color = require("./color");
const Category = require("./category");
const Material = require("./material");
const Finished = require("./finished");

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id_color: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_material: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_finished: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});
Product.belongsTo(Color, { foreignKey: 'id_color', as:'Color', allowNull: false });
Product.belongsTo(Material, { foreignKey: 'id_material', as:'Material', allowNull: false });
Product.belongsTo(Category, { foreignKey: 'id_category',as:'Category', allowNull: false });
Product.belongsTo(Finished, { foreignKey: 'id_finished',as:'Finished', allowNull: false });



module.exports = Product;