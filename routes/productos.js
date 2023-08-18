const {Router} =require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares/index.js');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos.js');
const { existeProductoPorId, existeCategoriaPorId, existeProductoPorNombre } = require('../helpers/db-validators');


const router= Router();

/**
 * {{url}}/api/Productos
*/
//Publico, una Producto
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );


//Publico, todas las Productos
router.get('/', obtenerProductos);
   
//Crear Producto- privado- cualquier persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

//Actualizar Producto- privado- cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto );

   //Delete Producto- privado- cualquier persona con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarProducto);
module.exports= router;