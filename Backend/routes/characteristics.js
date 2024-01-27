const { Router } = require('express');

const { getCharacteristics
} = require('../controllers/characteristics');

const router = Router(); 

router.get('/', getCharacteristics);



module.exports = router;