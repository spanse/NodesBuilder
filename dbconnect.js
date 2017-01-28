var sql = require('mssql');

var connection = new sql.Connection({
    user: 'remote',
    password: 'Marksman12',
    server: '216.197.156.69', // You can use 'localhost\\instance' to connect to named instance
    database: 'WebServer'
});

connection.connect(function (err) {
    if (err) throw err;
});
var request = new sql.Request();
module.exports = connection;
module.exports = request;