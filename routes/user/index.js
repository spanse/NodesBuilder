﻿//  Section: Required modules   //
var db = require('../../dbconnect');
var session = require('express-session');

/*
Purpose: Accept sent data, compare it to values in database,
         if a valid account, set account/session specific variables.
Uses:    username, password, email
*/
exports.loginUser = function (req, res) {
    var userDetails = JSON.parse(JSON.stringify(req.body));
    console.log("Username: " + userDetails.username);

    db.userLogin(activeConnection, userDetails).then(function (login){
        console.log("login value is: " + login);
        if (login == "true") {
            //User verified
            console.log("login successful");
            req.session.login = true;
            req.session.name = userDetails.username;
            res.send(req.session.name);
            console.log("Session login is: " + req.session.login);
        }
        else {
            //User invalid
            res.status(401).send("Invalid credentials");
        }
    });
};

/*
Purpose: Accept sent data, run a query on database to add the new user
Uses:    username, password, email
*/
exports.registerUser = function (req, res) {
    var userDetails = JSON.parse(JSON.stringify(req.body));
    console.log("User details are: " + userDetails);
    if (db.userRegister(activeConnection, userDetails) == true) {
        console.log("User registered successfully");
    }
    else {
        console.log("There was an error in registerUser");
    }

    console.log("registerUser done");

    res.send("Fall Through");

};