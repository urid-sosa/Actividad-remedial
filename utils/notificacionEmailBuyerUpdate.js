require('dotenv').config();
const nodemailer = require ('nodemailer');

const SERVIDOR_SMTP = 'smtp.office365.com';
const USUARIO_SMPT = '';
const PASSWORD_SMPT = '';

exports.passwordEmail = async ( email) => {
    try {
        let transporter = nodemailer.createTransport({
            host: SERVIDOR_SMTP,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: USUARIO_SMPT, // generated ethereal user
              pass: PASSWORD_SMPT, // generated ethereal password
            },
        });
        
        let mensaje = `Hello ${email} <br>`;
            mensaje += 'You have made update a quote for the following products, ';
            mensaje += `${productId},${quantity},${price_u}, ${total_products},</a> <br> `
            mensaje += `${summary}, ${total_amount}, ${date},${date_expirantion},</a> <br> `;
            mensaje += 'You have 20 days to cancel your quote from this moment.';

        let info = await transporter.sendMail({
            from: '" 👻" <>', // sender address
            to: `<${email}>`, // list of receivers
            subject: "cotización realizada", // Subject line
            //text: "Hello world?", // plain text body
            html: mensaje, // html body
        });
        
        console.log("Message sent: %s", info.messageId);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};