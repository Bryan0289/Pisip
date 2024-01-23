const { response, request } = require("express");
const Material = require('../models/material');

const validateIdMaterial = (source = '') => {

    return async (req = request, res = response, next) => {
        try {
            const { id_material } = source === 'body' ? req.body : req.params;

            const material = await Material.findOne({
                where: {
                    id: id_material
                }
            });
            if (!material) {
                res.status(404).json({
                    ok: false,
                    msg: "El Material no existe"
                });
                return;
            }

            next();
        } catch (error) {
            res.status(400).json({
                ok: false,
                msg: "Hable con el admin"
            })
        }
    }
}

module.exports = {

    validateIdMaterial
}