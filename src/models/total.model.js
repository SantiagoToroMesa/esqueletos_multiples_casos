const db = require('../config/db')
module.exports = {
    total_amount(cb){
        db.query('SELECT c.name, sum(b.paid_amount) FROM transactions t JOIN bills b ON t.bill_id = b.id JOIN clients c on b.client_id = c.id GROUP BY c.name', (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        })
    }
}