const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            fatherName Text NOT NULL,
            village TEXT NOT NULL,
            mobile TEXT NOT NULL,
            address TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS cudOrder (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id TEXT NOT NULL,
            order_details TEXT NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customer(id)
        );
    `);
});

module.exports = db;
