var express = require("express");
var router  = express.Router();
var Job = require("../models/job");
var middleware = require("../middleware");


//INDEX - show all jobs
router.get("/", function(req, res){
    // Get all jobs from DB
    Job.find({}, function(err, allJobs){
       if(err){
           console.log(err);
       } else {
          res.json({"jobs":allJobs});
       }
    });
});

//CREATE - add new job to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to jobs array
    var newJob = {
        "description_en": req.user.description_en,
        "description_fr": req.user.description_fr,
        "salary": req.user.salary,
        "work_location": req.user.work_location,
        "work_universe": req.user.work_universe,
        "required_skill": req.user.required_skill,
        "date_posted": Date.now, 
        "education_level": req.user.education_level,
        "author": req.user._id
    }
    
    // Create a new job and save to DB
    Job.create(newJob, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to jobs page
            console.log(newlyCreated);
            res.redirect("/jobs");
        }
    });
});


// SHOW - shows more info about one job
router.get("/:id", function(req, res){
    //find the job with provided ID
    Job.findById(req.params.id, function(err, foundJob){
        if(err){
            console.log(err);
        } else {
            console.log(foundJob)
            //render show template with that job
            res.json({"jobs" : foundJob});
        }
    });
});

// EDIT JOB ROUTE
router.get("/:id/edit", middleware.checkJobOwnership, function(req, res){
    Job.findById(req.params.id, function(err, foundJob){
        res.render("jobs/edit", {job: foundJob});
    });
});

// UPDATE JOB ROUTE
router.put("/:id",middleware.checkJobOwnership, function(req, res){
    // find and update the correct job
    Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, updatedJob){
       if(err){
           res.redirect("/jobs");
       } else {
           //redirect somewhere(show page)
           res.redirect("/jobs/" + req.params.id);
       }
    });
});

// DESTROY JOB ROUTE
router.delete("/:id",middleware.checkJobOwnership, function(req, res){
   Job.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.status(400).send("Error");
      } else {
          res.status(200).send("Success");
      }
   });
});


module.exports = router;

