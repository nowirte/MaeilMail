const maria = require("mysql");

const db = maria.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
    date: process.env.DB_DATESTRINGS,
});

db.connect();

module.exports = db;


