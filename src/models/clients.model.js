const db = require('../config/db')
module.exports = {
    getAll(cb) {
        db.query('SELECT * FROM clients', (err, results) => {
            if (err) return cb(err);
            cb(null, results);
        });
    },

    create(data, cb) {
        db.query(
            'INSERT INTO clients (name, document, address, zip_code, postal) VALUES (?, ?, ?, ?, ?)',
            [data.name, data.document, data.address, data.zip_code, data.postal],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    update(id, data, cb) {
        db.query(
            'UPDATE clients SET name = ?, document = ?, address = ?, zip_code = ?, postal = ? WHERE id = ?',
            [data.name, data.document, data.address, data.zip_code, data.postal, id],
            (err, result) => {
                if (err) return cb(err);
                cb(null, result);
            }
        );
    },

    delete(id, cb) {
        db.query('DELETE FROM clients WHERE id = ?', [id], (err, result) => {
            if (err) return cb(err);
            cb(null, result);
        });
    },


};