const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM bills', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO bills (id, client_id, billing_period, invoiced_amount, paid_amount) VALUES (?, ?, ?, ?, ?)',
            [data.id, data.client_id, data.billing_period, data.invoiced_amount, data.paid_amount],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE bills SET client_id = ?, billing_period = ?, invoiced_amount = ?, paid_amount = ?, status = ? WHERE id = ?',
            [data.client_id, data.billing_period, data.invoiced_amount,data.paid_amount,data.status, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM bills WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};