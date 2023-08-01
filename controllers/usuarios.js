const {response, request} = require('express');

const usersGet = (req, res) => {
    // res.send('hola')
    const {query, nombre= 'No name', apikey, page=1, limit=10}=req.query;//query params ?

    res.status(403).json({
        // "ok": true,
        
        "msg": "get -controlador",
        query,
        nombre,
        apikey,
        page,
        limit
    })
  };


  const usersPut = (req, res) => {
    // res.send('hola')

    const {id,body} = req;
    res.status(403).json({
        // "ok": true,
        "msg": "Put -controlador", 
        id
  })};

  const usersDelete = (req, res) => {
    //mud res.send('hola')
    res.status(403).json({
        // "ok": true,
        "msg": "Delete -controlador"
    })
  };

  const usersPost = (req, res) => {
    // res.send('hola')
    const {nombre, edad}=req;
    res.status(403).json({
        // "ok": true,
        "msg": "Post -controlador",
        nombre,
        edad

    })

    
  };
  
  const usersPatch = (req, res) => {
    // res.send('hola')
    res.status(403).json({
        // "ok": true,
        "msg": "Patch -controlador"
    })
  };

 module.exports = {usersGet,usersPut,usersDelete,usersPatch,usersPost,usersPut}