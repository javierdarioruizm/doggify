// Método para mostrar todos los usuarios de la BBDD

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}


// Método para mostrar un usuario por Id

const getById = (pId) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT u.* FROM usuarios as u WHERE u.id=?', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}



// Método para registrar un nuevo usuario

const registerNew = ({ nombre, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, email, password) values (?, ?, ?)', [nombre, email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// Método para hacer login un usuario

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email=?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}





// Método para crear un nuevo usuario

const createNew = ({ nombre, apellidos, direccion, codigo_postal, poblacion, provincia, pais, telefono, email, foto, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, apellidos, direccion, codigo_postal, poblacion, provincia, pais, telefono, email, foto, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, direccion, codigo_postal, poblacion, provincia, pais, telefono, email, foto, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

// Método para editar un usuario

const updateById = (id, { nombre, apellidos, direccion, codigo_postal, poblacion, provincia, pais, email, telefono, password }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuarios SET nombre= ?, apellidos= ?, direccion= ?, codigo_postal= ?, poblacion= ?, provincia= ?, pais= ?,  email= ?, telefono= ?, password= ? WHERE id = ?', [nombre, apellidos, direccion, codigo_postal, poblacion, provincia, pais, email, telefono, password, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    });

}

// Método para borrar un usuario

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM usuarios WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })

    });

}



// Método para mostrar los lugares favoritos de un usuario por Id

const getFavoritosById = (pId) => {

    return new Promise((resolve, reject) => {
        db.query('SELECT fk_usuario, group_concat(fk_lugar) as Favoritos FROM favoritos WHERE fk_usuario=? GROUP BY fk_usuario', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}


    ;


module.exports = {
    getAll, getById, registerNew, createNew, getByEmail, updateById, deleteById, getFavoritosById
}


