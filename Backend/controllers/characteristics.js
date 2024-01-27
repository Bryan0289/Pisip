const { response, request } = require('express');
const Category = require('../models/category');
const Color = require('../models/color');
const Material = require('../models/material');
const Finished = require('../models/finished');
const { where } = require('sequelize');


const getCharacteristics = async (req = request, res = response) => {
    try {

        const [category, color, material, finished] = await Promise.all([
            Category.findAll({
                where: { status: true }
            }),
            Color.findAll({
                where: {
                    status: true
                }
            }),
            Material.findAll(
                {
                    where: { status: true }
                }
            ),
            Finished.findAll(
                {
                    where: { status: true }
                }
            )

        ])


        res.status(200).json({
            ok: true,
            category, color, material, finished
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get Characteristics"
        })
    }
}


module.exports = {
    getCharacteristics
}