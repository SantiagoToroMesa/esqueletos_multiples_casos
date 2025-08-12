// src/routes/salas.routes.js
const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients.controller');

router.get('/', clientsController.getclients);
router.post('/', clientsController.createclient);
router.put('/:id', clientsController.updateclient);
router.delete('/:id', clientsController.deleteclient);

module.exports = router;