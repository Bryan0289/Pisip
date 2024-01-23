const { response, request } = require('express');
const Category = require('../models/category');


const getCategory = async (req=request, res = response) => {
    try {

        const categorys = await Category.findAll({
            where: {
              status: true
            }
          });
          

        res.status(200).json({
            ok: true,
            categorys
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get Category"
        })
    }
}
const getAllCategory = async (req=request, res = response) => {
    try {

        const categorys = await Category.findAll();
          

        res.status(200).json({
            ok: true,
            categorys
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin getAll Category"
        })
    }
}

const postCategory=async(req=request, res = response)=>{
    try {

        const {name, description}= req.body;

        const category= await Category.create({
            name,
            description
        })
          

        res.status(200).json({
            ok: true,
            category
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post Category"
        })
    }
}
const putCategory=async(req=request, res = response)=>{
    try {
    
        const {id_category}= req.params;
        const {name, description}= req.body;

        const category=await Category.update(
            {name, description,status:true},
            {where:{id:id_category}}
        )
      
    
        res.status(200).json({
            ok: true,
            category
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put Category"
        })
    }

}
const deleteCategory=async(req=request, res = response)=>{
    try {
    
        const {id_category}= req.params;
        
        const category=await Category.update(
            {status:false},
            {where:{id:id_category}}
        )
    
        res.status(200).json({
            ok: true,
            category
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin delete Category"
        })
    }
}

module.exports = {
    getCategory,
    getAllCategory,
    postCategory,
    putCategory,
    deleteCategory
}