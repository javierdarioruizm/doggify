const mysql = require('mysql');
// Importamos o requerimos la librería mysql de Node

// Función que permite conectarnos a la BBDD cuando arranque la aplicación
// const connect = () => {
//     const pool = mysql.createPool({
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',     // '' (vacío en windows) y root en mac
//         port: 3306,       // puerto 3306 en windows y 8889 en mac
//         database: 'doggify'
//     });

//     global.db = pool;

//     // Pool es un objeto de Node que se encarga de gestionar peticiones

//     // Creamos una variable global en node para que en cualquier parte del proyecto podamos usar la variable db, el .global indica que es una variable global
// }

const connect = () => {
    const pool = mysql.createPool({
        host: 'eu-cdbr-west-01.cleardb.com',
        user: 'bef2d9c05616d2',
        password: 'fe0c7508',     // '' (vacío en windows) y root en mac
        port: 3306,       // puerto 3306 en windows y 8889 en mac
        database: 'heroku_bf8d16c0e648d0b'
    });

    global.db = pool;

    // Pool es un objeto de Node que se encarga de gestionar peticiones

    // Creamos una variable global en node para que en cualquier parte del proyecto podamos usar la variable db, el .global indica que es una variable global
}

module.exports = connect;
// aquí exportamos la función connect