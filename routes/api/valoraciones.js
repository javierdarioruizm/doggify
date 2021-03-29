const router = require('express').Router();
const { getAll, getByIdLugar, getNumPages, getByIdLugarByPage, addComentarioById } = require('../../models/valoraciones');
const { checkToken } = require('../middlewares');



// Mostrar los comentarios de cada lugar

router.get('/:idLugar', async (req, res) => {
    try {
        const result = await getByIdLugar(req.params.idLugar);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Mostrar el número de páginas de comentarios de cada lugar

router.get('/:idLugar/paginas', async (req, res) => {
    try {
        const paginas = await getNumPages(req.params.idLugar);
        res.json(paginas);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para mostrar los comentarios de cada lugar por paginas

router.get('/:idLugar/pagina/:idPagina', async (req, res) => {
    console.log(req.params.idLugar, req.params.idPagina)
    try {

        const result = await getByIdLugarByPage(req.params.idLugar, req.params.idPagina);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para insertar un nuevo comentario

router.post('/:idLugar/', checkToken, async (req, res) => {
    try {
        const result = await addComentarioById(req.userId, req.params.idLugar, req.body.valoracion, req.body.comentario);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;