//DB connection
var config = {
    user: 'remote',
    password: 'Marksman12',
    server: '216.197.156.69',
    database: 'WebServer'
};

//Dependencies/Modules
var express = require('express');
var sql = require('mssql');
activeConnection = new sql.Connection(config);
var routes = require('./routes');
var postRoutes = require('./ajax');
var path = require('path');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var db = require('./dbconnect');
var app = express();
var server = require('http').createServer(app);
io = require('socket.io').listen(server);

//Rendering
app.engine('pug', engines.pug);
app.engine('ejs', engines.ejs);


var sessionManage = session({
    store: new MSSQLStore(config), // options are optional
    secret: 'keyboard cat',
    cookie: { maxAge: 600000 }
});

io.use(function (socket, next) {
    sessionManage(socket.request, socket.request.res, next);
});

//Setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));



/*
Middleware
ISSUE: Careful of dependents that must load after. Issue with some
(bodyParsers work inconsistently if not loaded last?
Sessions works inconsistently if not loaded as one of first
*/
app.use(sessionManage);
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.locals.pretty = true;
}

//Routes
app.get('/', routes.login);
app.get('/about', routes.about);
app.get('/blog', routes.blog);
app.get('/login', routes.login);
app.get('/inventory', routes.inventory);
app.get('/console', routes.console);
app.get('/logout', routes.logout);
//app.get('/loadProducts', routes.loadProducts);
app.post('/example', routes.example);
app.post('/confirm', routes.confirm); //form method is POST, action is /confirm
app.post('/loginUser', postRoutes.loginUser);
app.post('/registerUser', postRoutes.registerUser);


//Socket Managamenet
io.sockets.on("connection", function (socket) {
    if (socket.request.session.login != true) {
        socket.disconnect('unauthorized');
    }
    console.log("Socket connection added.");
    console.log("socket connected");
    console.log("socket id is: " + socket.id);
    postRoutes.loadProducts(socket);
});


server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});