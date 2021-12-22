const mongoose = require('mongoose');

const mongoose_URL = 'mongodb+srv://omid_s0:ramzam910061544MO@cluster0.noolf.mongodb.net/resturant-menu'

mongoose.connect(mongoose_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('connected', () => {console.log('connected to DB!');})

db.on('error', () => {console.log('Mongodb Connection Failed!')})

module.exports = db