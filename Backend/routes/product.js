const { Router } = require('express');
const { check } = require('express-validator')

const { getProducts,
    getProductById,
    postProduct,
    putProduct,
    putImgProduct,
    deleteProduct,
    getProductsLoose
} = require('../controllers/product');

const { validate,
    validateIdCategory,
    validateIdColor,
    validateIdFinished,
    validateIdMaterial,
    validateIdProduct, 
    validateFile} = require('../middleware');

const router = Router();


router.get('/', getProducts);

router.get('/:id_product',
    [
        check('id_product', 'El producto es requerido').notEmpty(),
        validate,
        validateIdProduct()
    ]
    , getProductById);


router.post('/', 
    [
        check('name', 'El nombre es requerido').notEmpty(),
        check('description', 'La descripción es requerido').notEmpty(),
        check('size', 'La descripción es requerido').notEmpty().isNumeric(),
        check('id_color', 'El Color es requerido').notEmpty(),
        check('id_material', 'El Material es requerido').notEmpty(),
        check('id_category', 'La Categoria es requerido').notEmpty(),
        check('id_finished', 'El Acabado es requerido').notEmpty(),
        validate,
        validateIdColor('body'),
        validateIdMaterial('body'),
        validateIdCategory('body'),
        validateIdFinished('body')
    ]
, postProduct);


router.put('/:id_product',
    [
        check('name', 'El nombre es requerido').notEmpty(),
        check('description', 'La descripción es requerido').notEmpty(),
        check('size', 'El Tamaño es requerido').notEmpty(),
        check('size', 'El Tamaño es numerico').isNumeric(),
        check('id_product', 'El Producto es requerido').notEmpty(),
        check('id_color', 'El Color es requerido').notEmpty(),
        check('id_material', 'El Material es requerido').notEmpty(),
        check('id_category', 'La Categoria es requerido').notEmpty(),
        check('id_finished', 'El Acabado es requerido').notEmpty(),
        validate,
        validateIdProduct(),
        validateIdColor('body'),
        validateIdMaterial('body'),
        validateIdCategory('body'),
        validateIdFinished('body')
    ]
    , putProduct);
router.put('/img/:id_product',
    [
        validateIdProduct(),
        validateFile
    ]
    , putImgProduct);

router.delete('/:id_product',
[
    check('id_product', 'El producto es requerido').notEmpty(),
        validate,
        validateIdProduct()
]
, deleteProduct);

router.get('loose',getProductsLoose);



module.exports = router;