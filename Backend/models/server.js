const express = require('express');
const cors = require('cors');
const {dbConneccion} = require('../DB/dbConnection');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.Path = '/api';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }
    async conectarDB(){
        await dbConneccion()
    }

    middlewares() {


        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( `${this.Path}/material`, require('../routes/material'));
        this.app.use( `${this.Path}/color`, require('../routes/color'));
        this.app.use( `${this.Path}/category`, require('../routes/category'));
        this.app.use( `${this.Path}/finished`, require('../routes/finished'));
        this.app.use( `${this.Path}/store`, require('../routes/store'));
        this.app.use( `${this.Path}/product`, require('../routes/product'));
        this.app.use( `${this.Path}/storage`, require('../routes/storage'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;