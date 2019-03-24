var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    "first_name": String, // First name of candidate
    "last_name": String, // Last name of candidate
    "emai" : String,
    "password" : String,
    "universe_permits": Array, // Array listing all Universe’s this candidate can apply
    "willing_to_do_overtime": Boolean, // Willing to do overtime
    "willing_to_relocate_to_other_universe": Boolean, // Willing to relocate to another univers
    "home_address": String, // Address in String unformatted
    "education_level ": Number, // ID education level
    "skills": Array // All skills tied to this candidate
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);