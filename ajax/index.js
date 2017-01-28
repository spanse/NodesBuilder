var db = require('../dbconnect');

function validInput(toValidate) {
    if (toValidate != null && toValidate.length > 0) {
        return true;
    }
    else {
        return false;
    }
}

activeConnection.connect(); //This is loaded when server is restarted (require module). So output will not display to console.
//console.log("AJAX index.js loaded");

exports.createUser = function (req, res) {
    var email = JSON.parse(JSON.stringify(req.body.email)); //converts email to JSON string, then parses string from it
    var username = JSON.parse(JSON.stringify(req.body.username));
    var password = JSON.parse(JSON.stringify(req.body.password));
    console.log(email + ", " + username + ", " + password);

    if (validInput(email) && validInput(username) && validInput(password)) {

        db.userQuery(activeConnection, "INSERT INTO Users VALUES ('" + username + "','" + password + "','" + email + "')");
        res.send();
    }
    else {
        res.status(500).send('Invalid details.');
    }
};