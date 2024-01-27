const { response } = require("express")


const validateFile = (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}


module.exports = {
    validateFile
}
