const { Router } = require('express');
const { check } = require('express-validator')

const { getCategory,
    getAllCategory,
    postCategory,
    putCategory,
    deleteCategory
} = require('../controllers/category');
const { validate, 
    validateIdCategory } = require('../middleware');

const router = Router();

router.get('/', getCategory);
router.get('/all', getAllCategory);

router.post('/',
    [
        check('name', 'El Nombre es requerido').notEmpty(),
        check('description', 'La description es requerido').notEmpty(),
        validate
    ]
    , postCategory);
router.put('/:id_category',
    [
        validateIdCategory(),
        check('name', 'El Nombre es requerido').notEmpty(),
        check('description', 'La description es requerido').notEmpty(),
        validate
    ], putCategory);
router.delete('/:id_category',
    [
        validateIdCategory(),
    ],
    deleteCategory);



module.exports = router;