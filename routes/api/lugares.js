const router = require('express').Router();
const { getAll, getNumPages, getAllByPage, getByCategoria, getByCategoriaByPage, getNumPagesCategoria, getAllCategorias, getById, createNew, updateById, deleteById } = require('../../models/lugares');



const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');


// Uso de Multer para la imagen

router.post('/', upload.single('imagenes'), async (req, res) => {

    if (req.file) {


        // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        console.log(req.file.filename);
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que reciba la extensiónrs
        fs.renameSync(req.file.path, newPath);

        // Modifico el BODY para poder incluir el nombre de la imagen en la BD
        req.body.imagenes = newName;

    }

    try {
        const result = await createNew(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }

});


// Método para crear un nuevo lugar sin Multer(sin foto)

router.post('/', async (req, res) => {
    try {
        const result = await createNew(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para mostrar todos los lugares

router.get('/', async (req, res) => {

    try {
        const lugares = await getAll();
        res.json(lugares);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Método para mostrar los lugares por página

router.get('/pagina/:idPagina', async (req, res) => {

    try {
        console.log(req.params.idPagina)
        const pagina = await getAllByPage(req.params.idPagina);
        res.json(pagina);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para mostrar el número de páginas de todos los lugares

router.get('/paginas', async (req, res) => {

    try {

        const paginas = await getNumPages();
        res.json(paginas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para mostrar el número de páginas de cada categoría

router.get('/:categoria/paginas', async (req, res) => {

    try {

        const paginas = await getNumPagesCategoria(req.params.categoria);
        res.json(paginas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




// Método para obtener las categorías

router.get('/all/categorias', async (req, res) => {

    try {
        const categorias = await getAllCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Método para mostrar los lugares por categoria

router.get('/categoria/:categoria', async (req, res) => {

    try {

        const result = await getByCategoria(req.params.categoria);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Método para mostrar los lugares por categoria por paginas

router.get('/categoria/:categoria/pagina/:idPagina', async (req, res) => {
    console.log(req.params.categoria, req.params.idPagina)
    try {

        const result = await getByCategoriaByPage(req.params.categoria, req.params.idPagina);
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




// Método para actualizar un lugar

router.put('/:idLugar', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


// Método para borrar un lugar

router.delete('/:idLugar', async (req, res) => {
    try {
        const result = await deleteById(req.params.idLugar);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});








module.exports = router;