const express = require('express');
const router = express.Router();
const pendientecontroller = require('../controllers/pendiente.controller');

router.get('/', pendientecontroller.pendient);
module.exports = router;