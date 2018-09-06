const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    UserModel = require('../model/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
})

passport.use('login-local', new LocalStrategy(
    {
        /**email = name form email
                 * password = name form password
                 */
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, emailPassport, passwordPassport, done) => {
        let user = await UserModel.findOne({ email: emailPassport })
        if (!user) {
            return done(null, false, req.flash('loginMessage', "User not found."));
        }
        if (!user.comparePassword(passwordPassport)) {
            return done(null, false, req.flash('loginMessage', "Incorrect Password."));
        }
        done(null, user)
    }))



passport.use('register-local', new LocalStrategy(
    {
        /**email = name form email
         * password = name form password
         */
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, emailPassport, passwordPassport, done) => {
        let user = await UserModel.findOne({ email: emailPassport })
        if (user) {
            return done(null, false, req.flash('registerMessage', "The email is already"));
        } else {
            let newUser = new UserModel();
            newUser.email = emailPassport;
            newUser.password = newUser.encryptPassword(passwordPassport);
            await newUser.save();
            done(null, newUser);
        }

    }))