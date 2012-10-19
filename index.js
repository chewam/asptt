var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    config = require('./config');

var app = module.exports = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(config.path));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/:path', routes.index);
app.get('/', routes.index);
