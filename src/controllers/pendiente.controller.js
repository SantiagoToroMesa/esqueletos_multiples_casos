const pendiente = require('../models/pendiente.model');
exports.pendient = (req, res) => {
    pendiente.pay_pendient((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    })
};