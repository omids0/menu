const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      username: {type: String, require: true},
      password: {type: String, require: true},
      access: {type: String, require: true},
      isActive: {type: Boolean, require: true},
      phoneNum: {type: Number, require: true},
},{
      timestams: true,
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel