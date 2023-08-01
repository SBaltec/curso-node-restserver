const {Router} =require('express');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/usuarios');

const router= Router();

router.get('/', usersGet );
router.get('/:id', usersGet );
  router.post('/', usersPost);
  router.patch('/', usersPatch);
  router.put('/:id',  usersPut);
  router.delete('/;id', usersDelete);

module.exports= router;