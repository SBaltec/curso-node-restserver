
const {Router} =require('express');
const { check } = require('express-validator');

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole
} = require('../middlewares/index.js');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usersGet, usersGetById, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/usuarios');

const router= Router();
router.get('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],usersGetById);

router.get('/', usersGet );
// router.get('/:id', usersGet );
router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom( emailExiste ),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom( esRoleValido ), 
  validarCampos
], usersPost );

  router.patch('/', usersPatch);

  router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usersPut );


router.delete('/:id',[
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
]
 , usersDelete);

module.exports= router;