const express = require('express');
const cors = require('cors');
const { dbConneccion } = require('../DB/dbConnection');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            material:"/api/material",
            color:"/api/color",
            category:"/api/category",
            finished:"/api/finished",
            store:"/api/store",
            product:"/api/product",
            storage:"/api/storage",
            characteristics:"/api/characteristics",
    }

        this.conectarDB();

this.middlewares();

this.routes();
    }

    async conectarDB(){
    await dbConneccion()
}

middlewares() {


    this.app.use(express.static('public'));
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));

    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));

}

routes() {
    this.app.use(this.paths.material, require('../routes/material'));
    this.app.use(this.paths.color, require('../routes/color'));
    this.app.use(this.paths.category, require('../routes/category'));
    this.app.use(this.paths.finished, require('../routes/finished'));
    this.app.use(this.paths.store, require('../routes/store'));
    this.app.use(this.paths.product, require('../routes/product'));
    this.app.use(this.paths.storage, require('../routes/storage'));
    this.app.use(this.paths.characteristics, require('../routes/characteristics'));
}

listen() {
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    });
}

}




module.exports = Server;