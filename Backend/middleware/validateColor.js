const { response, request } = require("express");
const Color = require('../models/color');

const validateIdColor = (source = '') => {
    
    return async (req = request, res = response, next) => {
        try {
            const { id_color } = source === 'body' ? req.body : req.params;


            const color = await Color.findOne({
                where: {
                    id: id_color
                }
            });
            if (!color) {
                res.status(404).json({
                    ok: false,
                    msg: "El color no existe"
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

    validateIdColor
}