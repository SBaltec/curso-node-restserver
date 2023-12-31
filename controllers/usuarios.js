const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = async(req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
          .skip( Number( desde ) )
          .limit(Number( limite ))
  ]);

  res.json({
      total,
      usuarios
  });
};
const usersGetById = async(req, res) => {
try{
  const { id } = req.params;
  
  const usuario = await Usuario.findById(id);

  res.json(usuario);
}
catch(error){
  console.log("Error al obtener el usuario", error);

}
};

  const usersPut = async(req, res) => {
    // res.send('hola')
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, { new: true } );

    res.json(usuario);

  };

  const usersDelete = async (req, res) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } , { new: true });
    

    res.json(usuario);

  };

  const usersPost = async (req, res) => {
    // res.send('hola')
   
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
  await usuario.save();

    res.json({
        usuario
    });

  
  };
  
  const usersPatch = (req, res) => {
    // res.send('hola')
    res.status(403).json({
        // "ok": true,
        "msg": "Patch -controlador"
    })
  };

 module.exports = {usersGet,usersPut,usersDelete,usersPatch,usersPost,usersPut, usersGetById}