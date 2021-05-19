const { ObjectId } = require('mongodb')
const Connection = require('../lib/conection')
const crypto = require('../lib/crypto')
const jwt = require('./../lib/jwt')

module.exports = {

    async login(req, res) {
        try {
            const { usuario, clave } = req.body
            const pwd = await crypto.encriptar(clave)
            const conn = new Connection()
            await conn.connect()

            // const datos = await conn.db.db('seed').collection('usuarios').find().toArray()
            const datos = await conn.db.db('seed').collection('usuarios').findOne({
                usuario,
                clave: pwd
            })
            conn.db.close()

            if (datos) {
                const access_token = jwt.registrar({ usuario_id: datos._id })
                access_token ? res.send({ access_token }) : res.status(501).json('error interno')
            } else {
                res.status(200).json('usuario incorrecto')
            }

        } catch (error) {
            res.status(501).json(`Error interno: ${error}`)
        }
    },

    async buscar(req, res) {
        const conn = new Connection()
        await conn.connect()

        const datos = await conn.db.db('seed').collection('usuarios').find().toArray()
        
        if(datos){
            res.json(datos)
        } else {
            console.log('error al registrar el usuario')
            res.status(501).send('Error interno')
        }
        // validar el token del usuario, y consultar los permisos del usuario
    },

    async registrar(req, res) {
        const { usuario, clave } = req.body
        const pwd = await crypto.encriptar(clave)
        const conn = new Connection()
        await conn.connect()

        conn.db.db('seed').collection('usuarios').insertOne({
            usuario,
            clave: pwd
        })
            .then(e => res.status(200).json('usuario registrado'))
            .catch(err => {
                console.log('error al registrar el usuario')
                res.status(501).send('Error interno')
            })
        // validar el token del usuario, y consultar los permisos del usuario
    },

    async actualizar(req, res){
        const { usuario_id, usuario, clave } = req.body
        const pwd = await crypto.encriptar(clave)
        const conn = new Connection()
        await conn.connect()

        conn.db.db('seed').collection('usuarios').updateOne(
            { "_id": ObjectId(usuario_id) },
            { $set: { usuario: usuario, clave: pwd } }
        )
            .then(e => res.status(200).json('usuario actualizado'))
            .catch(err => {
                console.log('error al registrar el usuario')
                res.status(501).send('Error interno')
            })
    },

    async eliminar(req, res) {
        const { usuario_id } = req.body
        const conn = new Connection()
        await conn.connect()

        conn.db.db('seed').collection('usuarios').deleteOne({
            _id: ObjectId(usuario_id)
        })
            .then(e => res.status(200).json('usuario eliminado'))
            .catch(err => {
                console.log('error al registrar el usuario')
                res.status(501).send('Error interno')
            })
    }

}
