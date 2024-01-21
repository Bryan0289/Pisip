const validate = require('../middleware/validate');
const validateCategory = require('../middleware/validateCategory');
const validateColor = require('../middleware/validateColor');
const validateFinished = require('../middleware/validateFinished');
const validateMaterial = require('../middleware/validateMaterial');
const validateProduct = require('../middleware/validateProduct');
const validateStorage = require('../middleware/validateStorage');
const validateStore = require('../middleware/validateStore');


module.exports = {
    ...validate,
    ...validateCategory,
    ...validateColor,
    ...validateFinished,
    ...validateMaterial,
    ...validateProduct,
    ...validateStorage,
    ...validateStore
}

