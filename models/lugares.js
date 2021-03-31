// Método para mostrar todos los lugares de la BBDD


const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar GROUP BY l.id', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}



// Método para mostrar todos los lugares por páginas que muestren 5 lugares

const getAllByPage = (pPagina) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar GROUP BY l.id LIMIT ${(pPagina - 1) * 5},5`, (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        });
    });
}



// Método para obtener el número de páginas necesarias para mostrar todos los lugares de 5 en 5

const getNumPages = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT CEIL(COUNT(id)/5) as numpaginas FROM lugares', (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });

    })
}

// Método para obtener el número de páginas necesarias para mostrar cada categoria de 5 en 5

const getNumPagesCategoria = (pCategoria) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT CEIL(COUNT(id)/5) as numpaginas FROM lugares WHERE categoria=?', [pCategoria], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });

    })
}

// Método para filtrar todos los lugares por categoría paginadas de 5 en 5

const getByCategoriaByPage = (pCategoria, pPagina) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar WHERE l.categoria="${pCategoria}" GROUP BY l.id LIMIT ${(pPagina - 1) * 5},5`, [pCategoria, pPagina], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);

        });
    });
}




// Método para filtrar todos los lugares por categoría

const getByCategoria = (pCategoria) => {
    console.log(pCategoria)
    return new Promise((resolve, reject) => {
        db.query('SELECT l.*, GROUP_CONCAT(DISTINCT(i.url)) as imagenes, TRUNCATE((AVG(v.estrellas)),1) as puntuacion, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(DISTINCT(v.estrellas)) as numero_valoraciones FROM lugares as l LEFT JOIN imageneslugares as i ON i.fk_lugar=l.id LEFT JOIN valoraciones as v ON v.fk_lugar=l.id WHERE l.categoria=? GROUP BY l.id', [pCategoria], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);

        });
    });
}


// Método para mostrar todas la categorias

const getAllCategorias = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT categoria FROM lugares ORDER BY categoria', (err, rows) => {
            if (err) {
                return reject(err);
            }
            console.log(rows)
            resolve(rows);
        });
    });
}


// Método para mostrar un lugar por Id

const getById = (pId) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT l.*, TRUNCATE((AVG(v.estrellas)),1) as puntuacion, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(v.fk_lugar) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON v.fk_lugar=l.id WHERE l.id=? GROUP BY l.id', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}



// Método para crear un nuevo lugar

const createNew = ({ nombre, direccion, poblacion, codigo_postal, provincia, pais, latitud, longitud, categoria, descripcion, horario, telefono, email, sitio_web, imagenes }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO lugares (nombre, direccion, poblacion, codigo_postal, provincia, pais, latitud, longitud, categoria, descripcion, horario, telefono, email, sitio_web, imagenes ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, direccion, poblacion, codigo_postal, provincia, pais, latitud, longitud, categoria, descripcion, horario, telefono, email, sitio_web, imagenes], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}


// Método para editar un lugar

const updateById = ({ id, nombre, direccion, codigo_postal, poblacion, provincia, pais, latitud, longitud, telefono, email, horario, categoria, sitio_web, descripcion }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE lugares SET nombre = ?, direccion= ? , codigo_postal= ? , poblacion= ? , provincia= ? , pais= ? , latitud= ? , longitud= ? , telefono= ? , email= ? , horario= ? , categoria= ?, sitio_web= ? , descripcion= ? WHERE id = ?', [nombre, direccion, codigo_postal, poblacion, provincia, pais, latitud, longitud, telefono, email, horario, categoria, sitio_web, descripcion, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    });

}

// Método para borrar un lugar

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM lugares WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    });

}


module.exports = {
    getAll, getAllByPage, getNumPages,
    getNumPagesCategoria, getByCategoriaByPage,
    getAllCategorias, getByCategoria,
    getById, createNew, updateById, deleteById
}



