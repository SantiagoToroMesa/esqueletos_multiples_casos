const total = require('../models/total.model');
exports.total_amount = (req, res) => {
    total.total_amount((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    })
};