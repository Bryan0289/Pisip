const { response, request } = require('express');
const Product = require('../models/product');
const Storage = require('../models/storage');
const { Sequelize } = require('sequelize');
const Color = require('../models/color');
const Category = require('../models/category');
const Material = require('../models/material');
const Finished = require('../models/finished');
const Store = require('../models/store');

const { saveFile, deleteFile } = require('../helpers/file');



const getProducts = async (req = request, res = response) => {
    try {
        const { name, status, ...queryParameters } = req.query;
        const searchOptions = {};

        if (status=='false') {
            searchOptions.status = false
        } else if (status == 'true') {
            searchOptions.status = true
        }
        if (name) {

            searchOptions.name = {
                [Sequelize.Op.like]: `%${name}%`
            };
        }


        Object.keys(queryParameters).forEach(key => {
            const value = queryParameters[key];

            if (value !== undefined && value !== null && value !== '') {
                searchOptions[key] = {
                    [Sequelize.Op.eq]: value
                };
            }
        });
        console.log(queryParameters);
        const products = await Product.findAll({
            include:[
                {
                    model:Color
                },
                {
                    model:Category
                },
                {
                    model:Material
                },
                {
                    model:Finished
                },
            ],
            where: {
                ...searchOptions
            }
        });


        res.status(200).json({
            ok: true,
            products
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const getProductById = async (req = request, res = response) => {
    try {
        const { id_product: id_Product } = req.params;

        const [product, storage] = await Promise.all([
            Product.findOne({
                attributes: ['id', 'name', 'description', 'size', 'img'],
                include: [
                    { model: Color },
                    { model: Material },
                    { model: Category },
                    { model: Finished }
                ],
                where: { id: id_Product }
            }),
            Storage.findAll({
                attributes: ['lot'],
                include: [{ model: Store }],
                where: { id_Product }
            })
        ]);

        res.status(200).json({
            ok: true,
            product,
            storage
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const postProduct = async (req = request, res = response) => {
    try {

        const { name, description, size, id_color, id_material, id_category, id_finished } = req.body;

        const product = await Product.create({
            name,
            description,
            size,
            id_color,
            id_material,
            id_category,
            id_finished
        });


        res.status(200).json({
            ok: true,
            product,
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const putImgProduct = async (req = request, res = response) => {
    try {

        const { id_product } = req.params;

        const product = await Product.findByPk(id_product);


        if (product.img) {
            deleteFile(product.img)
        }

        product.img = await saveFile(req.files);

        await product.save()

        res.status(200).json({
            ok: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const putProduct = async (req = request, res = response) => {
    try {
        const { id_product } = req.params;
        const { name, description, size, id_color, id_material, id_category, id_finished } = req.body;

        const [product] = await Product.update(
            {
                name,
                description,
                size,
                id_color,
                id_material,
                id_category,
                id_finished,
                status: true
            },
            {
                where: {
                    id: id_product
                }
            }
        )


        res.status(200).json({
            ok: true,
            product
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const deleteProduct = async (req = request, res = response) => {
    try {
        const { id_product } = req.params;
        const product = await Product.update(
            { status: false },
            { where: { id: id_product } }
        )


        res.status(200).json({
            ok: true,
            product

        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin"
        })
    }
}
const getProductsLoose = async (req = request, res = response) => {
    try {

        const storage = await Storage.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('lot')), 'totalLot']
            ],
            include: [
                {
                    model: Store,
                    where: { status: 0 }
                },
                {
                    model: Product,
                    attributes: ['id', 'name', 'description', 'size'],
                }
            ],
            group: ['Product.id'],

        })

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


module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    putImgProduct,
    deleteProduct,
    getProductsLoose
}