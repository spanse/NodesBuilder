////Provides database connectivity functions////

var sql = require('mssql');

/*
Purpose: Authenticate a user against the database
Input:  @activeConnection - a valid connection to the database
        @loginDetails - a JSON object containing "username", "password"
Output: @returned - A string of either "true", or "false", indicating if user is valid
*/
module.exports.userLogin = function (activeConnection, loginDetails) {
    var username = loginDetails.username;
    var password = loginDetails.password;

    var request = new sql.Request(activeConnection);
    request.input('username', sql.NVarChar(50), username);
    request.input('password', sql.NVarChar(50), password);
    return request.execute('loginUser').then(function (recordsets) {
        console.log(recordsets[0].length);
        var returned = recordsets[0][0].UserExists;
        console.log("returned is: " + returned);
        return returned;
    });
};

/*
Purpose: Register a user with the database
Input:  @activeConnection - a valid connection to the database
        @loginDetails - a JSON object containing "username", "password", "email"
Output:
*/
module.exports.userRegister = function (activeConnection, loginDetails) {
    var username = loginDetails.username;
    var password = loginDetails.password;
    var email = loginDetails.email;

    var request = new sql.Request(activeConnection);
    request.input('username', sql.NVarChar(50), username);
    request.input('password', sql.NVarChar(50), password);
    request.input('email', sql.NVarChar(50), email);
    request.execute('registerUser').then(function (recordsets) {
        console.log("registerUser procedure successful.");
        console.log(recordsets);
        return true;

    }).catch(function (err) {
        console.log("Error in registerUser:");
        console.log(err);
    });

};

/*
Purpose: Load all products from the Products database.
Input:  @activeConnection - a valid connection to the database
Output: @[a promise] - A recordset containing all records from the Products table
*/
//HEY!: If no records are available, response will hang, should do a check. Or find existing fix 
//(timeout error should be getting thrown?), or submit an issue with mssql- connect
module.exports.productLoad = function (activeConnection) {
    return new sql.Request(activeConnection).query('SELECT * FROM Products');
};//productLoad

/*
Purpose: Adds a product record to the Products database
Input:  @activeConnection - a valid connection to the database
        @newProduct - a JSON object containing the values for the record.
*/
module.exports.addProduct = function (activeConnection, newProduct) {
    //Change empty strings to null values (so request.input can process them)
    for (var key in newProduct) { //for every key in newProduct
        if (!newProduct[key]) { //if its empty
            newProduct[key] = null; //change to null
        }
    }
    var request = new sql.Request(activeConnection);
    request.input('Name', sql.VarChar, newProduct.productName);
    request.input('Quantity', sql.Decimal, newProduct.productQuantity);
    request.input('Receive', sql.Date, newProduct.productReceive);
    request.input('Expire', sql.Date, newProduct.productExpire);
    request.input('Temperature', sql.Decimal, newProduct.productTemperature);
    request.input('Storage', sql.Int, newProduct.productStorage);
    request.input('Comment', sql.VarChar, newProduct.productComment);
    return request.query('INSERT INTO Products VALUES (@Name, @Quantity, @Temperature, @Receive, @Expire, @Storage, @Comment)');//.catch(function (err) {
        //console.log("Catching error from query");
    //});
};