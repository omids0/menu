const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: {type: String, require: true},
    category: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: true},
},{
    timestams: true,
})

const foodModel = mongoose.model('food', foodSchema)

module.exports = foodModel