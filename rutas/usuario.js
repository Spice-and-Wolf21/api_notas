const { Router } = require('express')

const routes =  Router()

const usuario = require('./../controladores/usuario')
const validarAcceso = require('./../lib/jwt')

routes.post('/login', usuario.login)
routes.get('/', usuario.buscar)
routes.post('/', usuario.registrar)
routes.put('/', usuario.actualizar)
routes.delete('/', usuario.eliminar)

module.exports = routes