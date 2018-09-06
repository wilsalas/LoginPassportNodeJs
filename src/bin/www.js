const express = require('express'),
    app = express(),
    path = require('path'),
    morgan = require('morgan'),
    passport = require('passport'),
    ejsEngine = require('ejs-mate'),
    flash = require('connect-flash'),
    session = require('express-session'),
    keys = require('../config/keys');

/**Initializations */
require('../config/database');
require('../passport/local-auth');

/**Settings */
app.set('views', path.join(__dirname, '../public/views'));
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');

/**Middlewares */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: keys.SECRETKEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.registerMessage = req.flash('registerMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.userData = req.user;
    next();
});

/**Routes */
app.use('/', require('../routes/routes'));

/**Server start */
app.listen(keys.PORT, () => console.log("Conectado"));