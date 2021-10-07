const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalNumberOfProducts: {
        type: String,
        required: true
    },
    memberSince: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    
    
});


module.exports = mongoose.model('Stores', StoreSchema);