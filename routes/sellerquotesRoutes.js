const sellerQuotesController = require('../controllers/sellerQuotesController');

module.exports = (router, acessControl) => {
  // rutas del recurso patients
  router.post('/quote', acessControl('readOwn', 'quote-v'), sellerQuotesController.listQuotesSeller);
  return router;
};