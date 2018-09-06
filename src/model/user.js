const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

/**shema of users */
let UserShema = new mongoose.Schema({
    email: String,
    password: String
});

/**method encrypt data users */
UserShema.methods.encryptPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

/**method desencrypt data users */
UserShema.methods.comparePassword = function (password) {
    /**compare password received with the password database mongoose */
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', UserShema);