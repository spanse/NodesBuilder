//  Section: Required modules   //
var db = require('../../dbconnect');
var session = require('express-session');
//var io = require('socket.io');

//  Section: Setup/Variables  //
//Designate a connection to use when querying database//
activeConnection.connect(); //Creates a connection from the connection pool (var in app.js)

/*
Purpose: Accept sent data, compare it to values in database,
         if a valid account, set account/session specific variables.
Uses:    username, password, email
*/


/*
Purpose: Accept a request, query on database for products, return records
Uses:    Products
*/
exports.loadProducts = function (socket) {
    if (socket.request.session.login == true) {
        console.log("Loading products.");
        db.productLoad(activeConnection).then(function (recordsets) {
            var records = JSON.parse(JSON.stringify(recordsets));
            console.log("emit to socket: " + socket.id);
            for (var c = 0; c < records.length; c++) {
                //console.log(records[c]);
                for (var key in records[c]) {
                    if (records[c][key] == null) {
                        
                        records[c][key] = "Empty";
                        console.log(records[c][key]);
                    }
                }
            }
            io.to(socket.id).emit("product", records);
            console.log("Session ID: " + socket.request.session.id);
        });
    }
    console.log("Session ID: " + socket.request.session.sid);
};

    exports.addProduct = function (socket, data) {
        if (socket.request.session.login == true) {
            console.log("Adding product.");
            db.addProduct(activeConnection, data).catch(function (err) {
                console.log(err);
                io.to(socket.id).emit("addProductError", "Error in add product");
            });
        }
};