var mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
    "description_en": String, // English description
    "description_fr": String, // French description
    "salary": Number, // Job postings salary
    "work_location": String, // Address in String unformatted
    "work_universe": Number, //Universe ID
    "required_skill": Array, // All skills required for this Job Posting  
    "date_posted": Date, // Date
    "education_level": Number, // ID minimum education level required
    "author": {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

module.exports = mongoose.model("Job", jobSchema);