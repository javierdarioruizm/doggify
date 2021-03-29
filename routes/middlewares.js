const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

// Creamos un método para verificar si la petición tiene el token requerido

const checkToken = (req, res, next) => {
    // 1 - Comprobar si el token está en las cabeceras
    // Si dentro de las cabeceras de la petición no está la cabecera 'authorization'
    if (!req.headers['authorization']) {
        return res.json({ error: 'Debes incluir la cabecera Authorization' });
    }
    // 2 - Comprobar si el token es válido
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'tokendoggify');

    } catch (error) {
        return res.json({ error: 'El token es incorrecto' });
    }
    // Aquí estamos decodificando la clave del token

    // 3 - Comprobar si el token está caducado

    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'El token está caducado' });
    }

    // Incluir en la petición el ID del usuario que está realizando la petición
    req.userId = data.userId;

    next();

}


module.exports = {
    checkToken
}