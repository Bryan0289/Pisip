const { response, request } = require("express");
const Store = require('../models/store');

const validateIdStore = (source = '') => {
    return async (req = request, res = response, next) => {
        try {
            
            const {id_store} = source === 'body' ? req.body : req.params;
            const store = await Store.findOne({
                where: {
                    id: id_store
                }
            });
            if (!store) {
                res.status(404).json({
                    ok: false,
                    msg: "La Store no existe"
                });
                return;
            }
            req.store=store;
            next();

        } catch (error) {
            res.status(404).json({
                ok: false,
                error
            })
        }
    }

}

module.exports = {

    validateIdStore,
    validateIdStore
}