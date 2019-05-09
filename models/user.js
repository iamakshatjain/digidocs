const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username:String,
	password:String,
	email:String,
	documents:[String]//this could be converted to an array of objects for documents
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);