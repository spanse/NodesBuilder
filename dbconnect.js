var sql = require('mssql');

module.exports.userQuery = function (activeConnection, queryCommand) {
    console.log(queryCommand);
    new sql.Request(activeConnection).query(queryCommand).catch(function (err) {
        console.log("There was an error running the query.");
        console.log(err);
    });
}