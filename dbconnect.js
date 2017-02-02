var sql = require('mssql');

module.exports.userQuery = function (activeConnection, queryCommand) {
    console.log(queryCommand);
    new sql.Request(activeConnection).query(queryCommand).catch(function (err) {
        console.log("There was an error running the query.");
        console.log(err);
    });
}

module.exports.userLogin = function (activeConnection, loginDetails) {

    var username = loginDetails.username;
    var password = loginDetails.password;
    var email = loginDetails.email;

    var request = new sql.Request(activeConnection);
    request.input('username', sql.NVarChar(50), username);
    request.input('password', sql.NVarChar(50), password);
    return request.execute('loginUser').then(function (recordsets) {
        console.log(recordsets[0].length);
        var returned = recordsets[0][0].UserExists;
        console.log("returned is: " + returned);
        return returned;
    });
    //.then(function (recordsets) {
        //console.log("Returning value: " + returned);
        //return returned;
//});//execute.then  
}//userLogin

module.exports.userRegister = function (activeConnection, loginDetails) {
    console.log(loginDetails);
    loginDetails = JSON.parse(loginDetails);
    var username = loginDetails.username;
    var password = loginDetails.password;
    var email = loginDetails.email;

    var request = new sql.Request(activeConnection);
    request.input('username', sql.NVarChar(50), username);
    request.input('password', sql.NVarChar(50), password);
    request.input('email', sql.NVarChar(50), email);
    //request.output('output_parameter', sql.VarChar(50));
    request.execute('registerUser').then(function (recordsets) {
        console.log("registerUser procedure successful.");
        console.log(recordsets);
        return true;

    }).catch(function (err) {
        console.log("Error in registerUser:");
        console.log(err);
    });

}