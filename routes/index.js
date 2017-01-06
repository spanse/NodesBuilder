
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', {jadeversion: 'jade@1.11.0' });
};

exports.about = function (req, res) {
    res.render('about');
};

exports.contact = function (req, res) {
    res.render('contact', {prickOfTheDay: 'Davon' });
};

exports.chat = function (req, res) {
    res.render('chat');
};

exports.confirm = function (req, res) {
    var name = req.body.name;
    res.render('confirm', { name: name });
};
exports.cache = function (req, res) {
    res.render('cache');
};
exports.blog = function (req, res) {
    var titleHead = "Blog Example Title Number One!";
    var titleBody = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. \
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla \
    consequat massa quis enim.Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.In enim justo, rhoncus ut, imperdiet a, venenatis vitae, \
        justo.Nullam dictum felis eu pede mollis pretium.Integer tincidunt.Cras dapibus.Vivamus elementum semper nisi.Aenean vulputate eleifend tellus";

    var sideImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/220px-Smiley.svg.png';
    res.render('blog', { titleHead: titleHead, titleBody: titleBody, sideImage: sideImage });
};