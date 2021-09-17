const { Op } = require("sequelize");
const bcrypt = require ('bcrypt');
const {User} = require('../models');
  
exports.add = async (req, res, next) => {
    try {
        // validar que venga la contraseña
        if (!req.body.password) {
            res.status(400).json({ error: true, message: 'The password and email are required.' });
            next();
        }
        
        // si si trae la contraseña y el email, proceder al registro
        const userData = {...req.body};

        // cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // guardar el usuario
        const user = await User.create(userData);

        // evitar enviar la contraseña en la respuesta
        user.password = null;

            res.status(200).json({ message: 'The user has been registered.',user});

        //res.json({ menssage: 'El usuario a sido registrado.', usuario});
    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }
        res.status(400).json({ error: true, message: 'Register error user.' , errores });
    }
};

// listar los usuarios
exports.listSellers = async (req, res, next) => {
    try {
        // extraer la lista de usuarios
        const user = await User.findAll({
            where: {role: 'vendedor'}, attributes: {exclude: ['password','createdAt','updatedAt']}
        });
        const userData = user;
        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error reading users' });
        next();
    }
};

exports.listadmin = async (req, res, next) => {
    try {
        let roleadmin = `manager`;
        // extraer la lista de usuarios
        const user = await User.findAll({
            where: {area: req.user.area , role: roleadmin },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error reading users' });
        next();
    }
};

exports.update = async (req, res, next) => {
    try {
        // obtener el registro del usuario desde la bd
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: true, message: 'The user was not found.'});
        } else {
                // actualizar en la bd
                // generate new user
                let newUser = req.body;
                // cifrar la contraseña
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(newUser.password, salt);
                
            // procesar las propiedades que viene en body
            Object.keys(newUser).forEach((propiedad) => {
                user[propiedad] = newUser[propiedad];
            });
            // guaradar cambios
            await user.save();
            res.json({ message: 'The record was updated.' });
        }
    } catch (error) {
        res.status(503).json({ message: 'Failed to update user.' });
        next();
        }
};