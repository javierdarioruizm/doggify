const router = require('express').Router();
const { getFavoritos, getFavoritosByPage, getNumPagesFavoritos,
    getNumPagesFavoritosByCategoria, getFavoritosByCategoriaByPage,
    getFavoritosCategorias, getById, addNewFavorito, deleteFavoritoById } = require('../../models/favoritos');
const { checkToken } = require('../middlewares');




// Método para mostrar todos los favoritos de un usuario

router.get('/', checkToken, async (req, res) => {


    // Id de usuario inyectado por el Middleware checkToken!!!
    console.log(req.userId);

    try {
        const lugares = await getFavoritos(req.userId);
        res.json(lugares);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




// Método para mostrar los favoritos de un usuario por página

router.get('/pagina/:idPagina', checkToken, async (req, res) => {


    try {

        const pagina = await getFavoritosByPage(req.userId, req.params.idPagina);
        res.json(pagina);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




// Método para mostrar el número de páginas de todos los lugares

router.get('/paginas', checkToken, async (req, res) => {

    try {

        const paginas = await getNumPagesFavoritos(req.userId);
        res.json(paginas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Método para mostrar el número de páginas de cada categoría

router.get('/:categoria/paginas', checkToken, async (req, res) => {

    try {

        const paginas = await getNumPagesFavoritosByCategoria(req.userId, req.params.categoria);
        res.json(paginas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




// Método para obtener las categorías

router.get('/all/categorias', checkToken, async (req, res) => {

    try {
        const categorias = await getFavoritosCategorias(req.userId);
        res.json(categorias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// Método para mostrar los lugares por categoria

router.get('/categoria/:categoria', checkToken, async (req, res) => {

    try {

        const result = await getByCategoria(req.userId, req.params.categoria);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});



// Método para mostrar los lugares por categoria por paginas

router.get('/categoria/:categoria/pagina/:idPagina', checkToken, async (req, res) => {
    console.log(req.params.categoria, req.params.idPagina)
    try {

        const result = await getFavoritosByCategoriaByPage(req.userId, req.params.categoria, req.params.idPagina);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Método para mostrar un lugar por Id

router.get('/:idLugar', async (req, res) => {
    try {
        const result = await getById(req.params.idLugar);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});



// Método para añadir un lugar a favoritos

router.post('/:idLugar', checkToken, async (req, res) => {
    console.log('usuario:', req.userId, 'idLugar:', req.params.idLugar)
    try {

        const result = await addNewFavorito(req.userId, req.params.idLugar);
        res.json(result);
        console.log(result)
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});



// Método para borrar un lugar

router.delete('/:idLugar', checkToken, async (req, res) => {
    console.log('usuario:', req.userId, 'idLugar:', req.params.idLugar)
    try {
        const result = await deleteFavoritoById(req.userId, req.params.idLugar);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});





module.exports = router;