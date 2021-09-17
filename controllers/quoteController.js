
const {Quotes,SellerQuote,Product} = require('../models');

const { quoteEmailSeller } = require('../utils/quoteEmailSeller');
const { quoteEmailBuyer } = require('../utils/quoteEmailBuyer');
const { notificationEmailSellerUpdate } = require('../utils/notificationEmailSellerUpdate');
const { notificacionEmailBuyerUpdate } = require('../utils//notificacionEmailBuyerUpdate');

exports.add = async (req, res, next) => {
    try {
        // validar que vengan los productos
        if (!req.body) {
            res.status(400).json({ error: true, message: 'Los productos a cotizar son obligatorios.' });
            next();
        }
        const product = await Product.findAll({where: { status: true, } });

        for (let index = 0; index < dat.length; index++) {
            const element = dat[index];
            const data = req.body;
            UserId= req.user.id,
            ProductId= data.ProductId,
            quantity= data.quantity,
            price_u= data.quantity >= products.quantity_PPS
                (datos.quantity * products.price_S),
            total_products= data.length,
            summary= `En tu cotización tienes un total de: ${total_products}, y el total a pagar por estos productos es: ${total_amount}.` ,
            total_amount= price_U*quantity,
            date= new date(),
            date_expiration= new date()+1728000
        };
        await Quotes.create(data);
        //enviar el email
        const resultadoEmailC = await quoteEmailBuyer(
            productId,quantity,price_u, total_products, summary, total_amount, date, date_expirantion,
            req.user.email,
        );
        if (resultadoEmailC) {
            res.staus(200).json({ message: 'A message has been sent to the email provided.'});
        }
        const quote = await Quotes.findAll({where: { UserId: req.user.id } });
        const user = await User.findAll({where: {UserId: product.UserId}});
        const datas = product.UserId;
        datas.QuotesId = quote.id;
        await SellerQuote.create(datas);
        //enviar el email
        const resultadoEmailV = await quoteEmailSeller(
            productId,quantity,price_u, total_products, summary, total_amount, date, date_expirantion,
            user.email,
        );
        if (resultadoEmailV) {
            res.staus(200).json({ message: 'A message has been sent to the email provided.'});
        }
            next();
    } catch (error) {
        console.log(error);

        let errores = [];
        if (error.errors) {
            errores = error.errors.map( errorItem => ({
                campo: errorItem.path,
                error: errorItem.message,
            }));
        }
        res.status(400).json({ error: true, message: 'Quote register error.' , errores });
    }
};

// listar 
exports.listQuotesBuyer = async (req, res, next) => {
    try {
        const quote = await Quote.findall({
            where: {UserId: req.quote.id},
        });
        res.json(quote);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error reading quotes' });
        next();
    }
};

exports.updateQuotesBuyer = async(req, res, next) => {
    try {
        // obtener el registro del usuario desde la bd
        const quote = await Quote.findByPk(req.params.id);
        if(quote-date <= quote.date_expiration){

        // actualizar en la bd
                let newQuote = req.body;
            // procesar las propiedades que viene en body
            Object.keys(newQuote).forEach((propiedad) => {
                quote[propiedad] = newQuote[propiedad];
            });
            // guaradar cambios
            await quote.save();
            res.json({ message: 'The record was updated.' });
            //enviar el email
        const resultadoEmailC = await notificationEmailSellerUpdate(
            productId,quantity,price_u, total_products, summary, total_amount, date, date_expirantion,
            req.user.email,
        );
        if (resultadoEmailC) {
            res.staus(200).json({ message: 'A message has been sent to the email provided.'});
        }
        const product = await Product.findAll({where: { status: true, } });
        const quote = await Quote.findAll({where: { UserId: req.user.id } });
        const user = await User.findAll({where: {UserId : product.UserId}});
        const datas = product.UserId;
        datas.QuotesId = quote.id;
        await SellerQuote.create(datas);
        //enviar el email
        const resultadoEmailV = await notificationEmailSellerUpdate(
            productId,quantity,price_u, total_products, summary, total_amount, date, date_expirantion,
            user.email,
        );
        if (resultadoEmailCV) {
            res.staus(200).json({ message: 'A message has been sent to the email provided.'});
        }
            next();
        }
        else {
            res.status(404).json({ error: true, message: 'The time for modifying the quote has expired.'});
        }
    } catch (error) {
        res.status(503).json({ message: 'Failed to update quote.' });
    }
};

// delete
exports.delete = async (req, res, next) => {
    try {
        const quote = await Quote.findByPk(req.params.id);
        if(quote-date <= quote.date_expiration){
            await user.destroy(); // user.destroy({ where: {id: req.params.id }});
            res.json({ message: 'Quote was deleted.' });
        } else {
            res.status(404).json({ error:true, message: 'The Quote was not found.'});
        }
    } catch (error) {
        res.status(503).json({ message: 'Failed to delete quote. ' });
    }
};
