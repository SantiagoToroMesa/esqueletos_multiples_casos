require('dotenv').config({ path: '../.env'});
const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database');
})

fs.createReadStream('transactions.csv')
    .pipe(csv())
    .on('data', (row) => {
        connection.query(
            'INSERT INTO transactions (id,date,amount,type,plattform_used,bill_id) VALUES (?,?,?,?,?,?)',
            [row.id, row.date, row.amount,row.type,row.plattform_used,row.bill_id],
            (err) => {
                if (err) console.error(err);
            }
        );
    })
    .on('end', () => {
        console.log('CSV importado correctamente.');
        connection.end();
    });