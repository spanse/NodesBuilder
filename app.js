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
activeConnection.connect(); //need to connect before require other modules
var routes = require('./routes/general');
var userApi = require('./routes/user');
var objectApi = require('./routes/objects');
//var postRoutes = require('./ajax');
var path = require('path');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var db = require('./dbconnect');
var app = express();
var server = require('http').createServer(app);
io = require('socket.io').listen(server);

//Setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

var sessionManage = session({
    store: new MSSQLStore(config), // options are optional
    secret: 'keyboard cat',
    cookie: { maxAge: 600000 }
});

//Rendering
app.engine('pug', engines.pug);
app.engine('ejs', engines.ejs);

/*
Middleware
ISSUE: Careful of dependents that must load after. Issue with some
(bodyParsers work inconsistently if not loaded last?
Sessions works inconsistently if not loaded as one of first
*/
io.use(function (socket, next) {sessionManage(socket.request, socket.request.res, next);}); //add session middleware to socketIO
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

//Serve pages
app.get('/', routes.login);
app.get('/about', routes.about);
app.get('/blog', routes.blog);
app.get('/login', routes.login);
app.get('/inventory', routes.inventory);
app.get('/console', routes.console);

//Serve user API
app.get('/logout', routes.logout);
app.post('/loginUser', userApi.loginUser);
app.post('/registerUser', userApi.registerUser);


//Socket requests
/*
Can name events anything, must be the same string client/server side.
socket.(....) refers to the socket connection per connected instance. All socket
related must remain inside the on.connect function to be handled properly
*/
io.sockets.on("connection", function (socket) {
    if (socket.request.session.login != true) {
        socket.disconnect('unauthorized');
    }
    console.log("socket connected");
    console.log("socket id is: " + socket.id);
    objectApi.loadProducts(socket);

    socket.on('newProduct', function (data) {
        if (socket.request.session.login != true) {
            socket.disconnect('unauthorized');
        }
        console.log("New product received");
        objectApi.addProduct(socket, data);
    });

    socket.on('deleteProduct', function (data) {
        if (socket.request.session.login != true) {
            socket.disconnect('unauthorized');
        }
        console.log("New delete product request recieved");
        objectApi.deleteProduct(socket, data);
    });
}).on(Error, function (err) { //!!!!NOTE!!!! Temp solution. Need to properly handle errors.
    console.log(err)
});



//Create server
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});