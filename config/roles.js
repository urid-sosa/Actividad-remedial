const AccessControl = require('accesscontrol');

const ac = new AccessControl();
exports.roles = () => {
    ac.grant('ninguno');
    //aqui los permisos de rol: ninguno

    ac.grant('vendedor')
    .createOwn(['products'])
    .readOwn(['quote-v'])

    ac.grant('comprador')
    .readAny(['products','user'])
    .createOwn(['quote'])
    .readOwn(['quote-c'])
    updateOwn(['quote-c'])
    deleteOwn(['quote-c'])



    ac.grant('admin')

    return ac;
};

