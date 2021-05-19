const crypto = require('crypto')

module.exports = {
    /**
     * @param {String} clave
     */
    encriptar(clave){
        return new Promise((resolve, reject) => {
            const encriptado = crypto.createHmac('sha256', clave).update('luiggi').digest('hex')
            resolve(encriptado)
        })
    }
}