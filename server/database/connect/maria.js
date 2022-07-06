const maria = require("mysql");

const connect = maria.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'ghenakfn915!',
    database: 'nodejs_test'
});

module.exports = connect;