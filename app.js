
//Dependencies/Modules

var express = require('express');
var sql = require('mssql');
activeConnection = new sql.Connection({
    user: 'remote',
    password: 'Marksman12',
    server: '216.197.156.69',
    database: 'WebServer',
    //options: { encrypt: true },
    //pool: { max: 10, min: 0, idleTimeoutMillis: 600000 }
});
var routes = require('./routes');
var postRoutes = require('./ajax');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var db = require('./dbconnect');
var app = express();

var config = {
    user: 'remote',
    password: 'Marksman12',
    server: '216.197.156.69',
    database: 'WebServer'
};

//Setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

//Specify page formats
app.engine('pug', engines.pug);
app.engine('ejs', engines.ejs);

/*
Middleware
ISSUE: Careful of dependents that must load after. Issue with some
(bodyParsers work inconsistently if not loaded last?
Sessions works inconsistently if not loaded as one of first
*/

app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
//Enable session tracking
app.use(session({
    store: new MSSQLStore(config), // options are optional
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}));
app.use(express.favicon());
app.use(express.logger('dev'));

//bodyParsers
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

//Session Variables

//Give routes
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/blog', routes.blog);
app.get('/login', routes.login);
app.get('/inventory', routes.inventory);
app.post('/example', routes.example);
app.post('/confirm', routes.confirm); //form method is POST, action is /confirm
app.post('/createUser', postRoutes.createUser);

//Initialize HTTP web server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
