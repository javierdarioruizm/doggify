// Método para obtener todas las valoraciones de un lugar por Id

const getByIdLugar = (pIdLugar) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT u.nombre,v.fecha,v.estrellas,v.comentario  FROM valoraciones as v,usuarios as u WHERE v.fk_usuario=u.id AND v.fk_lugar=? ORDER BY fecha DESC', [pIdLugar], (err, rows) => {
            if (err) return reject(err);  // Controlamos la excepción, el error
            if (rows.length === 0) return resolve(null);
            // Si no se encuentra el dato porque no hay dato, array vacío
            resolve(rows);
            // Aquí resuelvo la promesa con la primera posición del array porque solo hay una
        });
    });
}



// Método para obtener las páginas necesarias para mostrar todas las valoraciones de un lugar de 5 en 5

const getNumPages = (pIdLugar) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT CEIL(COUNT(v.fecha)/5) as numpaginas FROM valoraciones as v,usuarios as u WHERE v.fk_usuario=u.id AND v.fk_lugar=?', [pIdLugar], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });

    })
}


const getByIdLugarByPage = (pIdLugar, pPagina) => {

    return new Promise((resolve, reject) => {
        db.query(`SELECT u.nombre,v.fecha,v.estrellas,v.comentario  FROM valoraciones as v,usuarios as u WHERE v.fk_usuario=u.id AND v.fk_lugar=${pIdLugar} ORDER BY fecha DESC LIMIT ${(pPagina - 1) * 5},5`, [pIdLugar, pPagina], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);

        });
    });
}




const addComentarioById = (fk_usuario, fk_lugar, estrellas, comentario) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO valoraciones (fk_usuario,fk_lugar,estrellas,comentario) VALUES (?,?,?,?)`, [fk_usuario, fk_lugar, estrellas, comentario], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows);

        });
    });
}


module.exports = {
    getByIdLugar, getNumPages, getByIdLugarByPage, addComentarioById
}