const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    designation:String,
    dob:Date,
    contactNumber:String,
    city:String,
    linkedin:String,
    twitter:String,
    facebook:String,
    instagram:String,
    other:String,
    website:String,
    description:String,
    numberOfEmployes:String
})

module.exports = mongoose.model("details",userSchema)