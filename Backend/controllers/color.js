const { response, request } = require('express');
const Color = require('../models/color');


const getColor = async (req = request, res = response) => {
    try {

        const colors = await Color.findAll({
            where: {
                status: true
            }
        });


        res.status(200).json({
            ok: true,
            colors
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get Color"
        })
    }
}
const getAllColor = async (req = request, res = response) => {
    try {

        const colors = await Color.findAll();


        res.status(200).json({
            ok: true,
            colors
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin getAll Color"
        })
    }
}

const postColor = async (req = request, res = response) => {
    try {

        const { name, description } = req.body;

        const color = await Color.create({
            name,
            description
        })


        res.status(200).json({
            ok: true,
            color
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post color"
        })
    }
}
const putColor = async (req = request, res = response) => {
    try {

        const { id_color } = req.params;
        const { name, description } = req.body;

        const [color] = await Color.update(
            { name, description, status: true },
            {
                where: { id: id_color }
            }
        )


        res.status(200).json({
            ok: true,
            color
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put Color"
        })
    }

}
const deleteColor = async (req = request, res = response) => {
    try {

        const { id_color } = req.params;

        const color = await Color.update(
            { status: false },
            {
                where:{id:id_color}
            }
        )


        res.status(200).json({
            ok: true,
            color
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin delete Color"
        })
    }
}

module.exports = {
    getColor,
    getAllColor,
    postColor,
    putColor,
    deleteColor
}