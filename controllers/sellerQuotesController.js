const {SellerQuote} = require('../models');

// listar
exports.listQuotesSeller = async (req, res, next) => {
    try {
        // extraer la lista
        const Quote = await SellerQuote.findall({
            where: {UserId: req.user.id},
        });
        res.json(sellerQuote);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error reading quotes' });
        next();
    }
};