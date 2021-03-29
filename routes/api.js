const router = require('express').Router();
const { checkToken } = require('./middlewares');

// Añadimos la ruta del fichero lugares
const lugaresApiRouter = require('./api/lugares');
// Usamos la ruta del fichero lugares
router.use('/lugares', lugaresApiRouter);


// Añadimos la ruta del fichero valoraciones
const valoracionesApiRouter = require('./api/valoraciones');
// Usamos la ruta del fichero opiniones
router.use('/valoraciones', valoracionesApiRouter);



// Añadimos la ruta del fichero usuarios
const usuariosApiRouter = require('./api/usuarios');
// Usamos la ruta del fichero usuarios
router.use('/usuarios', usuariosApiRouter);

// Introduzco el middleware que comprueba el token
router.use('/usuarios/cuenta', checkToken, lugaresApiRouter);

// Añadimos la ruta del fichero lugares
const favoritosApiRouter = require('./api/favoritos');
// Usamos la ruta del fichero lugares
router.use('/favoritos', checkToken, favoritosApiRouter);



module.exports = router;