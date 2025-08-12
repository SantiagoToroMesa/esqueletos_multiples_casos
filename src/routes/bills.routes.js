// src/routes/salas.routes.js
const express = require('express');
const router = express.Router();
const billsController = require('../controllers/bills.controller');

router.get('/', billsController.getbills);
router.post('/', billsController.createbill);
router.put('/:id', billsController.updatebill);
router.delete('/:id', billsController.deletebill);

module.exports = router;