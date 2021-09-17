const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const sesionController = require('../controllers/SesionController');

module.exports = function () {
    // rutas que no requiren autenticación
    router.post('/users', usersController.add);
    
    router.post('/login', sesionController.login);
    return router;
};