const { response, request } = require('express');
const Material = require('../models/material');


const getMaterial = async (req=request, res = response) => {
    try {

        const materials = await Material.findAll({
            where: {
              status: true
            }
          });
          

        res.status(200).json({
            ok: true,
            materials
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get Materia"
        })
    }
}
const getAllMaterial = async (req=request, res = response) => {
    try {

        const materials = await Material.findAll();
          

        res.status(200).json({
            ok: true,
            materials
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin getAll Materia"
        })
    }
}

const postMaterial=async(req=request, res = response)=>{
    try {

        const {name, description}= req.body;

        const material= await Material.create({
            name,
            description
        })
          

        res.status(200).json({
            ok: true,
            material
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post Materia"
        })
    }
}
const putMaterial=async(req=request, res = response)=>{
    try {
    
        const {id_material}= req.params;
        const {name, description}= req.body;

        const [material]= await Material.update(
            {name,description,status:true},
            {where:{id:id_material}}
        )
          
    
        res.status(200).json({
            ok: true,
            material
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put Materia"
        })
    }

}
const deleteMaterial=async(req=request, res = response)=>{
    try {
    
        const {id_material}= req.params;
        const [material]= await Material.update(
            {status:false},
            {where:{id:id_material}}
        )
          
    
        res.status(200).json({
            ok: true,
            material
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin delete Materia"
        })
    }
}

module.exports = {
    getMaterial,
    getAllMaterial,
    postMaterial,
    putMaterial,
    deleteMaterial
}