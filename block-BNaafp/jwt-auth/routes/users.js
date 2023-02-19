var express = require('express');
var router = express.Router();
let User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login", (req, res, next) => {
  res.render("login", {"title": "Login"});
});

router.get("/signup", (req, res, next) => {
  res.render("signup", {"title": "SignUp"});
});

router.post("/signup", (req, res, next) => {
  new User(req.body).save((err, data) => {
    err ? console.log(err) : console.log(data);
    res.send("Success");
  })
});

router.post("/login", async (req, res, next) => {
  var {username, password} = req.body;
  if ( !username || !password) {
    return res.status(400).json({"error": "Error user invalid or not registered"});

  }
  try {
    var user = await User.findOne({"username": username});
    if(!user) {
      return res.status(400).json({"error": "Email Not Registered"});
    }
    var result = await user.verifyPassword(password);
    if(!result) {
      return res.status(400).json({"error": "wrong password"});
    }
  } catch(error) {
    next(error);
  }
});

module.exports = router;
