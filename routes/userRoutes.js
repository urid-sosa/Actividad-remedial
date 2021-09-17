const usersController = require('../controllers/usersController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients

  router.get('/users', acessControl('readAny', 'user'), usersController.listSellers);
  router.get('/admin-area', acessControl('readAny', 'user'), usersController.listadmin);
  router.put('/users/:id', acessControl('updateAny', 'user'), usersController.update);
  return router;
};