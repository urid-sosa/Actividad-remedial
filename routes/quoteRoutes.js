const quoteController = require('../controllers/quoteController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients
  router.post('/quote', acessControl('createOwn', 'quote-c'), quoteController.add);
  router.get('/quote', acessControl('readOwn', 'quote-c'), quoteController.listQuotesBuyer);
  router.put('/quote/:id', acessControl('updateOwn', 'quote-c'), quoteController.updateQuotesBuyer);
  router.delete('/quote/:id', acessControl('deleteOwn', 'quote-c'), quoteController.delete);
  return router;
};