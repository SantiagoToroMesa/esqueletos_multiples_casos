const bill = require('../models/bills.model');

exports.getbills = (req, res) => {
    bill.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createbill = (req, res) => {
    const data = req.body;
    bill.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'bill successfully created'});
    });
};

exports.updatebill = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    bill.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'bill successfully updated' });
    });
};

exports.deletebill = (req, res) => {
    const id = req.params.id;
    bill.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'bill successfully deleted' });
    });
};