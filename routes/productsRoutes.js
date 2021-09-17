const productsController = require('../controllers/productsController');

module.exports = (router, acessControl) => {
  // rutas del recurso products

  router.post('/products', acessControl('createOwn', 'products'), productsController.add);
  router.get('/products', acessControl('readAny', 'products'), productsController.listProductUserVendedor);

  return router;
};