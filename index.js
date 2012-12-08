var express = require('express'),
    routes = require('./routes'),
    path = require('path');

var app = module.exports = express();

express.logger.token('datex', function(req, res) {
    var dt = new Date(),
        y = dt.getFullYear(),
        m = dt.getMonth() + 1,
        d = dt.getDate();

    return 'ASPTT - ' + d + '/' + m + '/' + y + ' ' + dt.toLocaleTimeString();
});

express.logger.format('custom', ':datex - :remote-addr - :method :url :status :res[content-length] - :response-time ms - :user-agent');

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('custom'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// app.get('/download/:path', routes.download);
// app.get('/:path', routes.index);
app.get('/', routes.index);
