// Método para mostrar todos los lugares favoritos por IdUsuario


const getFavoritos = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario=? GROUP BY l.id', [pIdUsuario], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}



// Método para mostrar todos los favoritos por páginas que muestren 5 lugares

const getFavoritosByPage = (pIdUsuario, pPagina) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario= ${pIdUsuario} GROUP BY l.id LIMIT ${(pPagina - 1) * 5},5`, [pIdUsuario, pPagina], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);
        });
    });
}



// Método para obtener el número de páginas necesarias para mostrar todos los favoritos de 5 en 5

const getNumPagesFavoritos = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT CEIL(COUNT(l.id)/5) as numpaginas FROM lugares as l LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario=?', [pIdUsuario], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });

    })
}

// Método para obtener el número de páginas necesarias para mostrar cada categoria de 5 en 5

const getNumPagesFavoritosByCategoria = (pIdUsuario, pCategoria) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT CEIL(COUNT(l.id)/5) as numpaginas FROM lugares as l LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario=${pIdUsuario} AND l.categoria=${pCategoria}`, [pIdUsuario, pCategoria], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });

    })
}

// Método para filtrar todos los favoritos por categoría paginadas de 5 en 5

const getFavoritosByCategoriaByPage = (pIdUsuario, pCategoria, pPagina) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT l.*, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(distinct(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON l.id = v.fk_lugar LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario=${pIdUsuario} AND l.categoria="${pCategoria}" GROUP BY l.id LIMIT ${(pPagina - 1) * 5},5`, [pIdUsuario, pCategoria, pPagina], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);

        });
    });
}


// Método para mostrar todas la categorias de los favoritos

const getFavoritosCategorias = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT l.categoria FROM lugares as l LEFT JOIN favoritos as f ON l.id=f.fk_lugar WHERE f.fk_usuario=? ORDER BY categoria', [pIdUsuario], (err, rows) => {
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
        db.query('SELECT l.*, TRUNCATE((AVG(v.estrellas)),1) as puntuacion, ROUND(AVG(v.estrellas)) as valoracion_media, COUNT(DISTINCT(v.fecha)) as numero_valoraciones FROM lugares as l LEFT JOIN valoraciones as v ON v.fk_lugar=l.id WHERE l.id=? GROUP BY l.id', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}




// Método para añadir un lugar a la lista de favoritos

const addNewFavorito = (fk_usuario, fk_lugar) => {

    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO favoritos (fk_usuario, fk_lugar)  values (?, ?)`, [fk_usuario, fk_lugar], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}




// Método para borrar un lugar de la lista de favoritos

const deleteFavoritoById = (fk_usuario, fk_lugar) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM favoritos WHERE fk_usuario=? AND fk_lugar=?`, [fk_usuario, fk_lugar], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    });

}


module.exports = {
    getFavoritos, getFavoritosByPage, getNumPagesFavoritos,
    getNumPagesFavoritosByCategoria, getFavoritosByCategoriaByPage,
    getFavoritosCategorias, getById, addNewFavorito, deleteFavoritoById
}



