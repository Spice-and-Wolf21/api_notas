const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = {

    /**
     * @param {Object} datos: Objeto con los datos a encriptar
     */
    registrar(datos){
        return jwt.sign(datos, config.SECRET, { expiresIn: 24 * 60 * 60 })
    },

    /**
     * @param {String} token: codigo de autorizacion para revisar los permisos del usuario
     */
    validar(token){
        console.log(token)
        return jwt.verify(token, config.SECRET, (err, decode) => err ? null : decode)
        // req.decoded = decode
    }


}