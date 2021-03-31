const router = require('express').Router();
const { getAll, getById, registerNew, getByEmail, createNew, updateById, deleteById, getFavoritosById } = require('../../models/usuarios');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../middlewares');

// Método para mostrar todos los usuarios

router.get('/', async (req, res) => {

    try {
        const usuarios = await getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Método para mostrar un usuario por Id

router.get('/cuenta', checkToken, async (req, res) => {
    try {
        const result = await getById(req.userId);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para crear o registrar un nuevo usuario

router.post('/registro', async (req, res) => {

    //Antes de crear el usuario, encripto la password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        const result = await registerNew(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});



// Método para que el usuario haga login

router.post('/login', async (req, res) => {

    const usuario = await getByEmail(req.body.email);
    if (usuario) {
        // Compruebo que las password coinciden
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({
                mensaje: 'Login correcto',
                token: createToken(usuario)
            });
        } else {
            res.json({ error: 'Error en email y/o password1' });
        }

    } else {
        res.json({ error: 'Error en email y/o password2' });
    }

});


function createToken(pUser) {
    const data = {
        userId: pUser.id,
        caduca: dayjs().add(7, 'days').unix()
    }
    return jwt.sign(data, 'tokendoggify');
}


// Método para actualizar un usuario

router.put('/edit', checkToken, async (req, res) => {
    try {
        console.log('edicionUsuario', req.userId, req.body)
        const result = await updateById(req.userId, req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para borrar un usuario

router.delete('/borrado', checkToken, async (req, res) => {
    console.log('usuario', req.userId)
    try {
        const result = await deleteById(req.userId);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});



module.exports = router;