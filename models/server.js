const express = require('express');
const cors=require('cors');

class Server {
    constructor(){
        this.app= express();
        this.port= process.env.PORT || 3000;
        this.usuariosRoutePath= '/api/usuarios';
        //middleware
        this.middlewares();
        this.routes();
    }

    middlewares(){
        
        
        //Proteccion del servidor
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))

    }
    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
            
        
        })
        
    }
}

module.exports= Server;
