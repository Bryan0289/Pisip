const { response, request } = require("express");
const Category = require('../models/category');

const validateIdCategory = (source = '') => {
    return async (req = request, res = response, next) => {
        try {
            
            const {id_category} = source === 'body' ? req.body : req.params;
            const category = await Category.findOne({
                where: {
                    id: id_category
                }
            });
            if (!category) {
                res.status(404).json({
                    ok: false,
                    msg: "La categoria no existe"
                });
                return;
            }
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

    validateIdCategory
}