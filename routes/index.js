var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/"); 
        });
    });
});


// SHOW - shows more info about one job
router.get("/:id", function(req, res){
    //find the job with provided ID
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log(foundUser)
            //render show template with that job
            res.json({"user" : foundUser});
        }
    });
});

// EDIT  ROUTE
router.get("/:id/edit", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        res.render("/edit", {job: foundUser});
    });
});

// UPDATE  ROUTE
router.put("/:id", function(req, res){
    // find and update the correct job
    User.findByIdAndUpdate(req.params.id, req.body.job, function(err, updatedUser){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/" + req.params.id);
       }
    });
});

// DESTROY  ROUTE
router.delete("/:id", function(req, res){
   User.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.status(400).send("Error");
      } else {
          res.status(200).send("Success");
      }
   });
});


//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});



module.exports = router;