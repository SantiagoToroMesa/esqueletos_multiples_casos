// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const clientRoutes = require('./routes/clients.routes');
const billRoutes = require('./routes/bills.routes');
const transactionRoutes = require('./routes/transactions.routes');
const totalroutes = require('./routes/total.routes');
const pendientroutes = require("./routes/pendiente.routes");
const app = express();

app.use(cors());
app.use(express.json());


// prefijos de rutas
app.use('/total', totalroutes)
app.use('/clients', clientRoutes);
app.use('/bills', billRoutes)
app.use('/transactions', transactionRoutes)
app.use('/pendient', pendientroutes)
module.exports = app;