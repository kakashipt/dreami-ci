var express = require('express');
var router = express.Router();
var Admin = require("../models/Admin");

/* GET home page. */
var Cinemas = require("../models/cinema");
var Movies = require("../models/Movies");
var Times = require("../models/Times");
/* GET home page. */
router.get('/', async function(req, res, next) {
  const cinemas = await Cinemas.find({});
  res.render('index', { cinemas: cinemas });
});

router.get("/login", function(req,res){
  res.render("login");
});

router.get("/register", function(req,res){
  res.render("register");
});

router.post("/register", async function (req,res){
  if(req.body.code == "dreamci2024"){
    const admin = new Admin();
    admin.email = req.body.email;
    admin.password = req.body.password;
    const data = await admin.save();
    console.log(data);
    res.redirect("/login");
  }else{
    res.redirect("/register");
  }
});

router.post("/login", async function(req,res){
  const admin = await Admin.findOne({ email: req.body.email});
  if(admin != null && Admin.compare(req.body.password, admin.password)){
    req.session.admin = {
      id: admin._id,
      email: admin.email,
    };
    res.redirect("/admin");
  }else{
    res.redirect("/login");
  }
  console.log(req.body);
  res.end("Done");
});

router.get("/blank",function(req,res){
  res.render("blank");
});


router.get("/cinemadetail/:id",async function(req,res){
  const cinema =await Cinemas.findById(req.params.id);
  const movies = await Movies.find({
  endDate: { $gte: Date.now() },
  cinemaId: req.params.id,
});
  console.log(movies);
  res.render("cinemadetail",{ cinema: cinema, movies: movies});
});

router.get("/moviedetail/:id",async function(req,res){
  const movie= await Movies.findById(req.params.id).populate("cinemaId","name");
  const time = await Times.findOne({ movieId: req.params.id });
  res.render("moviedetail",{ movie: movie, timetable: time.timeTable });
});

module.exports = router;
