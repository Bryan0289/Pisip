const { Router } = require('express');
const { check } = require('express-validator')

const {
    getStorages,
    postStorage,
    putLotStorage,
} = require('../controllers/storage');

const { validate,
    validateIdProduct,

    validateIdStore,
    validateIdStorage,
    validateStorageLot,
    validateLot } = require('../middleware')

const router = Router();

router.get('/', getStorages)

router.post('/',
    [
        check('id_product', 'El Producto es requerido').notEmpty(),
        check('id_store', 'El Store es requerido').notEmpty(),
        check('lot', 'El lot es requerido').notEmpty(),
        check('lot', 'El lot es un valor numerico').isNumeric(),
        validate,
        validateIdProduct('body'),
        validateIdStore('body'),
        validateStorageLot,
    ], postStorage);


router.put('/:id_storage', [
    validateIdStorage,
    validateLot
], putLotStorage);




module.exports = router;