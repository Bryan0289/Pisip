const { response, request } = require('express');
const Store = require('../models/store');
const Storage = require('../models/storage');
const Product = require('../models/product');
const { Sequelize } = require('sequelize');


const getStores = async (req = request, res = response) => {
    try {

        const stores = await Store.findAll({
            where: {
                status: true
            }
        });


        res.status(200).json({
            ok: true,
            stores
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get store"
        })
    }
}

const getStoreById = async (req = request, res = response) => {
    try {
        const { id_store } = req.params;

        const stores = await Store.findOne({
            where: {
                id: id_store
            }
        });


        res.status(200).json({
            ok: true,
            msg: "entro",
            stores
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get store"
        })
    }
}

const getValidStore = async (req = request, res = response) => {

    try {
        const product = req.product;

        const [newStores, freeStores] = await Promise.all([

            Store.findAll({

                where: {
                    status: true,
                    id: {
                        [Sequelize.Op.notIn]: Sequelize.literal(`
                    (SELECT id_store FROM Storages WHERE id_store IS NOT NULL)
                    `)
                    }
                },
                raw: true
            }),
            Storage.findAll({
                attributes: [
                    [Sequelize.fn('sum', Sequelize.literal('lot * Product.size')), 'totalSize'],
                ],
                include: [{
                    model: Store,
                    where: {
                        status: true
                    }
                },
                {
                    model: Product,
                    attributes: [],
                    where: {
                        status: true,
                    },
                },
                ],
                group: ['Store.id'],
                having: Sequelize.literal(`sum(lot*Product.size) + ${product.size} < Store.size`),
                raw: true
            })

        ]
        )

        const stors=[
            ...newStores,
            ...freeStores.map(store => {
                return {
                  "totalSize": store.totalSize,
                  "id": store['Store.id'],
                  "name": store['Store.name'],
                  "location": store['Store.location'],
                  "size": store['Store.size'],
                  "status": store['Store.status'],
                  "createdAt": store['Store.createdAt'],
                  "updatedAt": store['Store.updatedAt']
                };
              }),
            ]


        res.status(200).json({
            ok: true,
            stors,

        })


    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin get store :D",
            error
        })
    }
}
const getAllStore = async (req = request, res = response) => {
    try {

        const stores = await Store.findAll();


        res.status(200).json({
            ok: true,
            stores
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin getAll store"
        })
    }
}

const postStore = async (req = request, res = response) => {
    try {

        const { name, location, size } = req.body;

        const store = await Store.create({
            name,
            location,
            size,
        })


        res.status(200).json({
            ok: true,
            store
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin post store"
        })
    }
}
const putStore = async (req = request, res = response) => {
    try {

        const { id_store } = req.params;
        const { name, location, size } = req.body;

        const [store] = await Store.update(
            { name, location, size, status: true },
            { where: { id: id_store } }
        )


        res.status(200).json({
            ok: true,
            store
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin put store"
        })
    }

}
const deleteStore = async (req = request, res = response) => {
    try {

        const { id_store } = req.params;
        const [store] = await Store.update(
            { status: false },
            { where: { id: id_store } }
        )


        res.status(200).json({
            ok: true,
            store
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Hable con el Admin delete store"
        })
    }
}

module.exports = {
    getStores,
    getAllStore,
    getStoreById,
    postStore,
    putStore,
    deleteStore,
    getValidStore
}