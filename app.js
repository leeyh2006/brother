var express        = require('express');
var session        = require('express-session')
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var passport       = require('passport');
var app            = express();
var cons           = require('consolidate');
var index          = require('./routes/index');
var login          = require('./routes/user/login');
var join           = require('./routes/user/join');
var md5            = require('md5');



// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'src')));

app.use(passport.initialize());
app.use(passport.session());


app.use(session({
    key:'sid',
    secret:'secret',
    cookie:{
        maxAge:1000* 60 * 60
    }

}))


app.use('/', index);
app.use('/login',login);
app.use('/join',join);


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
