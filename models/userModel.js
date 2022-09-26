const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    first_name: { type : String, required : true},
    last_name: { type : String, required : true},
    username: { type : String, required : true},
    email: { type : String, required : true},
    password: { type : String, required : true},
    phone: { type : String, required : true},
    gender: { type : String, required : true},
    birth: { type : Number, required : true},
    address: { type : String, required : true},
    typeUser: { type : String, required : true}
})

const userModel = mongoose.model('userModel', schema)
module.exports = userModel