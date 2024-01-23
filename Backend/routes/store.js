const { Router } = require('express');
const { check } = require('express-validator')

const { getStores,
    getAllStore,
    getStoreById,
    postStore,
    putStore,
    deleteStore,
    getValidStore
} = require('../controllers/store');

const { validate, validateIdStore, validateIdProduct } = require('../middleware');

const router = Router();

router.get('/', getStores);
router.get('/id/:id_store', [
    validateIdStore(),
], getStoreById);
router.get('/all', getAllStore);
router.get('/valid',[
    check('id_product', 'El producto es requerido').notEmpty(),
    validate,
    validateIdProduct('body')
],getValidStore);

router.post('/',
    [
        check('name', 'El nombre es requerido').notEmpty(),
        check('location', 'La ubicación es requerido').notEmpty(),
        check('size', 'El Tamaño es requerido').notEmpty().isNumeric(),
        validate

    ], postStore);
router.put('/:id_store',
    [
        validateIdStore(),
        check('name', 'El nombre es requerido').notEmpty(),
        check('location', 'La ubicación es requerido').notEmpty(),
        check('size', 'El Tamaño es requerido').notEmpty().isNumeric(),
        validate
    ], putStore);
router.delete('/:id_store', validateIdStore(),deleteStore);



module.exports = router;