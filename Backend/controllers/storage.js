const { response, request } = require('express');
const Storage = require('../models/storage');
const { Sequelize } = require('sequelize');


const postStorage=async(req=request, res = response)=>{
    try {

        const{id_product,id_store, lot}=req.body;


        const storage=await Storage.create({
            id_product,
            id_store,
            lot
        })
          

        res.status(200).json({
            ok: true,
            storage
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
    
        const r=req.r;
        // const {id_storage}= req.params;
        // const {id_product,id_store,lot}= req.body;

        // const storage= await Storage.update(
        //     {id_product,id_store,lot},
        //     {where:{id:id_storage}}
        // )
          
    
        res.status(200).json({
            ok: true,
            // storage
            r
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put storage"
        })
    }

}

module.exports = {
    postStorage,
    putStorage,
    putLotStorage,
}