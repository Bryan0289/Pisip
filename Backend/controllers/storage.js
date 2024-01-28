const { response, request } = require('express');
const { Sequelize } = require('sequelize');
const Storage = require('../models/storage');
const Store = require('../models/store');
const Product = require('../models/product');


const getStorages=async(req=request, res = response)=>{
    try {
        const { ...queryParameters } = req.query;
        const searchOptions = {};

        Object.keys(queryParameters).forEach(key => {
            const value = queryParameters[key];

            if (value !== undefined && value !== null && value !== '') {
                searchOptions[key] = {
                    [Sequelize.Op.eq]: value
                };
            }
        });
        
        const storages = await Storage.findAll({
            include:[
                {
                    model:Product
                },
                {
                    model:Store
                }
            ],
            where: {
                ...searchOptions
            }
        });


        res.status(200).json({
            ok: true,
            storages
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}

const getStorageById= async(req=request, res = response)=>{
    try {
        const { id_storage } = req.params;

        
        const storage = await Storage.findByPk(id_storage,{
            include:[
                {
                    model:Product
                },
                {
                    model:Store
                }
            ]
        });


        res.status(200).json({
            ok: true,
            storage
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}

const postStorage=async(req=request, res = response)=>{
    try {
        const p=req.p;

        const{id_product,id_store, lot}=req.body;


        const storage=await Storage.create({
            id_product,
            id_store,
            lot
        })
          

        res.status(200).json({
            ok: true,
            p
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post storage"
        })
    }
}
const putLotStorage=async(req=request, res = response)=>{
    try {
    
        const {id_storage}= req.params;
        const {amount=1}= req.body;

        const storage= await Storage.update(
            {lot:Sequelize.literal(`lot-${amount}`)},
            {where:{id:id_storage}}
        )
          
    
        res.status(200).json({
            ok: true,
            storage
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put storage"
        })
    }

}
const putStorage=async(req=request, res = response)=>{
    try {
    
        
        const {id_storage}= req.params;
        const {id_product,id_store,lot}= req.body;

        const storage= await Storage.update(
            {id_product,id_store,lot},
            {where:{id:id_storage}}
        )
          
    
        res.status(200).json({
            ok: true,
            storage
            
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put storage"
        })
    }

}

module.exports = {
    getStorages,
    getStorageById,
    postStorage,
    putStorage,
    putLotStorage,
}