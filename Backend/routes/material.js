const { Router } = require('express');
const { check } = require('express-validator')

const { getMaterial,
    getAllMaterial,
    postMaterial,
    putMaterial,
    deleteMaterial
} = require('../controllers/material');
const { validate, validateIdMaterial } = require('../middleware');

const router = Router();

router.get('/', getMaterial);
router.get('/all', getAllMaterial);

router.post('/', [
    check('name', 'El Nombre es requerido').notEmpty(),
    check('description', 'La description es requerido').notEmpty(),
    validate
], postMaterial);
router.put('/:id_material', [
    validateIdMaterial(),
    check('name', 'El Nombre es requerido').notEmpty(),
    check('description', 'La description es requerido').notEmpty(),
    validate
], putMaterial);
router.delete('/:id_material', [
    validateIdMaterial(),
    
], deleteMaterial);



module.exports = router;