const mongoose =  require('mongoose')

let schema =  new mongoose.Schema({
    user_id : {type :String, required : true},
    username : {type :String, required : true},
    firstName : {type :String},
    lastName : {type :String},
    umur : {type :String},
    tglLahir : {type :String},
    gender : {type :String},
    address : {type :String}
})

const userProfileModel = mongoose.model('userProfileModel', schema)
module.exports = userProfileModel