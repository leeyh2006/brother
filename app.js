var express        = require('express');
var session        = require('express-session');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var passport       = require('passport');
var index          = require('./routes/index');
var login          = require('./routes/user/login');
var join           = require('./routes/user/join');
var board          = require('./routes/board/board');
var auth           = require('./routes/auth/auth');
var patent         = require('./routes/patent/patent');
var multipart      = require('connect-multiparty');
var serverConfig   = require('./serverConfig.js');
var app            = express();
var cons           = require('consolidate');

// view engine setup
// app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'src')));


app.use(multipart({
    uploadDir: serverConfig().img.url
}));


app.use(session({
    key:'sid',
    secret:'secret',
    cookie:{
        maxAge:1000* 60 * 60
    },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/login',login);
app.use('/join',join);
app.use('/board',board);
app.use('/auth',auth);
app.use('/patent',patent);


// app.use('/oauth',oauth);


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
