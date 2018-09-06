const express = require('express'),
    router = express.Router(),
    passport = require('passport');




router.get('/', isNotLogin, (req, res) => {
    res.render('index');
});
/**Login */
router.get('/login', isNotLogin, (req, res) => {
    res.render('login');
});
router.post('/login', passport.authenticate('login-local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}));

/**Register */
router.get('/register', isNotLogin, (req, res) => {
    res.render('register');
});
router.post('/register', passport.authenticate('register-local', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    passReqToCallback: true
}));

/**validate multiples routes isLogin */
router.use((req, res, next) => {
    isLogin(req, res, next);
})

/**Profile */
router.get('/profile', (req, res, next) => {
    res.render('profile');
});

router.get('/data', (req, res, next) => {
    res.send("SOY LA VERGA");
});

/**Logout */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**Middleware */
function isLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/profile');
}


module.exports = router;