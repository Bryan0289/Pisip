const { Router } = require('express');
const { check } = require('express-validator')

const { getFinished,
    getAllFinished,
    postFinished,
    putFinished,
    deleteFinished
} = require('../controllers/finished');
const { validate, validateIdFinished } = require('../middleware');



const router = Router();

router.get('/', getFinished);
router.get('/all', getAllFinished);

router.post('/', [
    check('name', 'El Nombre es requerido').notEmpty(),
    check('description', 'La description es requerido').notEmpty(),
    validate
], postFinished);
router.put('/:id_finished',
    [
        validateIdFinished(),
        check('name', 'El Nombre es requerido').notEmpty(),
        check('description', 'La description es requerido').notEmpty(),
        validate
    ], putFinished);
router.delete('/:id_finished', [
    validateIdFinished(),
], deleteFinished);



module.exports = router;