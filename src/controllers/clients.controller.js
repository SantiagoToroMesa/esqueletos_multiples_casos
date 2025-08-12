const client = require('../models/clients.model');


exports.getclients = (req, res) => {
    client.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createclient = (req, res) => {
    const data = req.body;
    client.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'client successfully created'});
    });
};

exports.updateclient = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    client.update(id, data, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'client successfully updated' });
    });
};

exports.deleteclient = (req, res) => {
    const id = req.params.id;
    client.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'client successfully deleted' });
    });
};