const mongoose = require('mongoose');
const { MONGODB } = require('../config/keys');

mongoose.connect(MONGODB.URI, { useNewUrlParser: true })
    .then(() => console.log("Mongodb Conected"))
    .catch(error => console.log(`Error conection mongodb ${error}`))
