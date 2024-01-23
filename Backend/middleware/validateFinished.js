const { response, request } = require("express");
const Finished = require('../models/finished');

const validateIdFinished = (source = '') => {

    return async (req = request, res = response, next) => {
        try {
            const { id_finished } = source === 'body' ? req.body : req.params;

            const finished = await Finished.findOne({
                where: {
                    id: id_finished
                }
            });
            if (!finished) {
                res.status(404).json({
                    ok: false,
                    msg: "El Acabado no existe"
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

    validateIdFinished
}