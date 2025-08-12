const db = require('../config/db')
module.exports = {
    pay_pendient(cb){
        db.query('SELECT bills.*, c.name, t.* FROM bills JOIN clients c on c.id = bills.client_id JOIN transactions t on bills.id = t.bill_id WHERE bills.status = \'Pendiente\'', (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        })
    }
}