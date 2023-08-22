
const {Router} =require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares/index.js');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.js');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router= Router();

/**
 * {{url}}/api/categorias
*/
//Publico, una categoria
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria );


//Publico, todas las categorias
router.get('/', obtenerCategorias);
   
//Crear categoria- privado- cualquier persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ],  
//(req,res) => {
//    res.json('post')
//   }
crearCategoria);

//Actualizar categoria- privado- cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );

   //Delete categoria- privado- cualquier persona con token valido
router.delete('/:id', [
    validarJWT,
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],borrarCategoria);
module.exports= router;