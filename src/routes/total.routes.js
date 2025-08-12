const express = require('express');
const router = express.Router();
const totalcontroller = require('../controllers/total.controller');

router.get('/', totalcontroller.total_amount);
module.exports = router;