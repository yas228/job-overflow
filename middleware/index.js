var Job = require("../models/job");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkJobOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Job.findById(req.params.id, function(err, foundJob){
           if(err){
               req.flash("error", "Job not found");
               res.redirect("back");
           }  else {
               // does user own the job?
            if(foundJob.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;