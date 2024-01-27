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
        const { lot } = req.body;
        const store=req.store;
        const product=req.product
        var occupiedSpace=0;
        

        const storages = await Storage.findAll({
            include:[
                {
                    model:Product,
                }

            ],
            where:{
                lot: {
                    [Op.gt]: 0 
                },
                id_store:store.id
            }
        });
        
        if(storages){
            for(const storage of storages){
                occupiedSpace+=storage.lot*storage.Product.size
            }
        }
        req.p=occupiedSpace;

        const sizeNewProduct=product.size*lot


        if((occupiedSpace+sizeNewProduct)>=store.size){
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