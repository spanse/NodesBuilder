﻿//NOTE: To avoid confusion avoid using app.set('view engine'...), must explicitly give all file extensions
//    : Be careful with passing in variables. Whenever you get client-side cache working, might get outdated

var db = require('../../dbconnect');

exports.home = function (req, res) {
    res.render('home.ejs');
};

exports.index = function (req, res) {
    res.render('index.pug', {jadeversion: 'jade@1.11.0' });
};

exports.about = function (req, res) {
    res.render('about.pug');
};

exports.blog = function (req, res) {
    var titleHead = "Blog Example Title Number One!";
    var titleBody = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. \
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla \
    consequat massa quis enim.Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.In enim justo, rhoncus ut, imperdiet a, venenatis vitae, \
    justo.Nullam dictum felis eu pede mollis pretium.Integer tincidunt.Cras dapibus.Vivamus elementum semper nisi.Aenean vulputate eleifend tellus";
    var sideImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/220px-Smiley.svg.png';
    res.render('blog.pug', { titleHead: titleHead, titleBody: titleBody, sideImage: sideImage });
};

exports.login = function (req, res) {
    if (req.session.login == true) {
        res.render('console.ejs');
    }
    else {

        res.render('login.ejs', { example: req.session.sessionName });
    }
};

exports.logout = function (req, res) {
    req.session.login = false;
    res.render('login.ejs');
};

exports.console = function (req, res) {
    if (req.session.login == true) {
        res.render('console.ejs');
    }
    else {
        res.status(401).send("You are not logged in.");
    }
};
