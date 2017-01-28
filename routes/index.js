//NOTE: To avoid confusion avoid using app.set('view engine'...), must explicitly give all file extensions
//    : Be careful with passing in variables. Whenever you get client-side cache working, might get outdated

var db = require('../dbconnect');

exports.index = function (req, res) {
    res.render('index.pug', {jadeversion: 'jade@1.11.0' });
};
exports.about = function (req, res) {
    res.render('about.pug');
};
exports.confirm = function (req, res) {
    var name = req.body.name;
    res.render('confirm.pug', { name: name });
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
exports.inventory = function (req, res) {
    req.session.sessionName = "Bob Builder";
    var sessionName = req.session.sessionName;
    var example = "Working";
    res.render('inventory.ejs', { name: sessionName, example: example });
};
exports.login = function (req, res) {
    res.render('login.ejs', { example: req.session.sessionName });
};
exports.example = function (req, res) {
    var returnString = JSON.stringify(req.body.fancy);

    res.send(returnString);
};