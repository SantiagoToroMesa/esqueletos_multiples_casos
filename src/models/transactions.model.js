const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM transactions', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO transactions (id, amount, type, plattform_used, bill_id) VALUES (?, ?, ?,?,?)',
            [data.id, data.amount,data.type, data.plattform_used, data.bill_id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE transactions SET amount = ?, type = ?, plattform_used = ?, bill_id = ? WHERE id = ?',
            [data.amount,data.type, data.plattform_used, data.bill_id, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM transactions WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    }
};