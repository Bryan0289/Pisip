const { response, request } = require("express");
const { Op } = require('sequelize');


const Storage = require('../models/storage');
const Store = require('../models/store');
const Product = require("../models/product");

const validateIdStorage = async (req = request, res = response, next) => {
    try {

        const { id_storage } = req.params;
        const storage = await Storage.findOne({
            where: {
                id: id_storage
            }
        });
        if (!storage) {
            res.status(404).json({
                ok: false,
                msg: "El Storage no existe"
            });
            return;
        }
        req.storage = storage;
        next();

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "error",
            error
        })
    }
}

const validateStorageLot = async (req = request, res = response, next) => {
    try {
        // todo:validar con la multiplicacion de lot y product.size
        const { id_store, lot } = req.body;
        const store=req.store;
        const newProduct=req.product
        

        const storage = await Storage.findAll({
            include:[
                {
                    model:Product,
                }

            ],
            where:{
                lot: {
                    [Op.gt]: 0 
                },
                id_store
            }
        })
        
        var sizeTotalLot=0;
        for (const s of storage) {
            const sizeLot=s.Product.size*s.lot;
            sizeTotalLot+=sizeLot;
        }
        const sizeFree=store.size-sizeTotalLot;
        if(sizeFree<=(newProduct.size*lot)){
            res.status(404).json({
                ok: false,
                msg: "Espacio insuficiente"
            });
            return;
        }

        next();

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "aqui",
            error
        })
    }
}

const validateLot = async (req = request, res = response, next) => {
    try {
        const storage = req.storage;
        const amount = req.body.amount || 1;

        if (amount > storage.lot) {
            res.status(404).json({
                ok: false,
                msg: "Lote no suficiente"
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


module.exports = {

    validateIdStorage,
    validateStorageLot,
    validateLot
}