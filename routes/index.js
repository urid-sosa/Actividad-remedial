const express = require('express');
const { acessControl } = require('../middlewares/accessControl');

const router = express.Router();

// importar archivos de rutas
const quoteRoutes = require('./quoteRoutes');

const userRoutes = require('./userRoutes');

const productsRoutes = require('./productsRoutes');


module.exports = () => {

  // vincular router de cada archivo de rutas
  quoteRoutes(router, acessControl);

  userRoutes(router, acessControl);

  productsRoutes(router, acessControl);

  
  return router;
}
