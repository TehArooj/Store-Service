const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    lastPasswordEdit: {
        type: Date,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Auths', AuthSchema);