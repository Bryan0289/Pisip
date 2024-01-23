const { response, request } = require("express");
const Product = require('../models/product');

const validateIdProduct = (source = '') => {
    return async (req = request, res = response, next) => {
        try {
            
            const {id_product} = source === 'body' ? req.body : req.params;
            const product = await Product.findOne({
                where: {
                    id: id_product
                }
            });
            if (!product) {
                res.status(404).json({
                    ok: false,
                    msg: "El producto no existe"
                });
                return;
            }
            req.product=product;
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

    validateIdProduct
}