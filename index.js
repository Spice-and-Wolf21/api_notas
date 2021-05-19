const express = require("express");
const usuario = require("./rutas/usuario.js");

const server = express();

server.set("port", 3000);

server.use(express.json());

// rutas de accesoa  la API
server.use("/usuario", usuario);

// otras rutas
server.get("*", (req, res) => {
  res.status(200).json("Acceso denegado");
});

// Servidor Escucha
server.listen(process.env.PORT || server.get("port"));
