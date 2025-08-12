const transaction = require('../models/transactions.model');

exports.gettransactions = (req, res) => {
    transaction.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createtransaction = (req, res) => {
    const data = req.body;
    transaction.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'transaction successfully created'});
    });
};

exports.updatetransaction = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    transaction.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'transaction successfully updated' });
    });
};

exports.deletetransaction = (req, res) => {
    const id = req.params.id;
    transaction.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'transaction successfully deleted' });
    });
};