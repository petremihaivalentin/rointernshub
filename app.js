// setup app insights before anything else
// to test with analytics, supply an ID in the environment variable below, or replace the placeholder
const appInsights = require("applicationinsights");
var iKey = process.env["APPINSIGHTS_INSTRUMENTATIONKEY"] || "placeholder";
appInsights.setup(iKey).start();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

var index = require('./routes/index');

var app = express();

// analytics routing
// must be placed before bodyParser
app.use('/ai', proxy({ target: 'https://dc.services.visualstudio.com', changeOrigin: true, pathRewrite: { '^/ai': '' } }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// imported resources
app.use('/dist/ai.0.js', express.static(__dirname + '/node_modules/applicationinsights-js/dist/ai.0.js'));

// request helpers
function getUpn(req) {
    var upnHeader = req.headers["x-ms-client-principal-name"];
    return upnHeader || "local";
}

// setup analytics
app.locals.iKey = iKey;
app.use((req, res, next) => {
    res.locals.upn = getUpn(req);
    next();
});

// index
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;