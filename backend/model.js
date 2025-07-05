var mongoose = require("mongoose");
var userSchema=mongoose.Schema({
    email:String,
    password:String
})
var usermodel = mongoose.model("user", userSchema)
module.exports = usermodel;