// src/routes/salas.routes.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions.controller');

router.get('/', transactionsController.gettransactions);
router.post('/', transactionsController.createtransaction);
router.put('/:id', transactionsController.updatetransaction);
router.delete('/:id', transactionsController.deletetransaction);

module.exports = router;