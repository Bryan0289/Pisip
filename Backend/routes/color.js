const { Router } = require('express');
const { check } = require('express-validator')

const { getColor,
    getAllColor,
    postColor,
    putColor,
    deleteColor
} = require('../controllers/color');
const { validate,validateIdColor } = require('../middleware');

const router = Router(); 

router.get('/', getColor);
router.get('/all', getAllColor);

router.post('/',
    [
        check('name', 'El Nombre es requerido').notEmpty(),
        check('description', 'La description es requerido').notEmpty(),
        validate
    ], postColor);
router.put('/:id_color',
    [
        validateIdColor(),
        check('name', 'El Nombre es requerido').notEmpty(),
        check('description', 'La description es requerido').notEmpty(),
        validate
    ], putColor);
router.delete('/:id_color',
    [
        validateIdColor(),

    ], deleteColor);



module.exports = router;