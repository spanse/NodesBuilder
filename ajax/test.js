var connection = require('../dbconnect');

function exampleOutput() {
    console.log("exampleOutput ran successfully.");
}

function exampleQuery() {
    new connection.Request().query('SELECT * FROM dbo.Users').then(function (recordset) {
        console.log(recordset);
        console.log("exampleQuery ran successfully.");
    });
}

module.exports = exampleOutput;

//Summary:
//connection2 DOES successfully reference variables in dbconnect.js (although intelisense doesn't seem to find them)
