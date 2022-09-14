const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    username: { type : String, required : true},
    email: { type : String, required : true},
    password: { type : String, required : true},
    typeUser: { type : String}
})

const userModel = mongoose.model('userModel', schema)
module.exports = userModel