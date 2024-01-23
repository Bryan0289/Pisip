const { response, request } = require('express');
const Finished = require('../models/finished');


const getFinished = async (req=request, res = response) => {
    try {

        const finisheds = await Finished.findAll({
            where: {
              status: true
            }
          });
          

        res.status(200).json({
            ok: true,
            finisheds
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get finished"
        })
    }
}
const getAllFinished = async (req=request, res = response) => {
    try {

        const finisheds = await Finished.findAll();
          

        res.status(200).json({
            ok: true,
            finisheds
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin getAll finished"
        })
    }
}

const postFinished=async(req=request, res = response)=>{
    try {

        const {name, description}= req.body;

        const finished= await Finished.create({
            name,
            description
        })
          

        res.status(200).json({
            ok: true,
            finished
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post finished"
        })
    }
}
const putFinished=async(req=request, res = response)=>{
    try {
    
        const {id_finished}= req.params;
        const {name, description}= req.body;

        const finished= await Finished.update(
            { name, description, status:true}
            ,{where: { id:id_finished }
        });
          
    
        res.status(200).json({
            ok: true,
            finished
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put finished"
        })
    }

}
const deleteFinished=async(req=request, res = response)=>{
    try {
    
        const {id_finished}= req.params;

        const finished= await Finished.update(
            {status:false}
            ,{where: { id:id_finished }
        });
          
    
        res.status(200).json({
            ok: true,
            finished
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin delete finished"
        })
    }
}

module.exports = {
    getFinished,
    getAllFinished,
    postFinished,
    putFinished,
    deleteFinished
}