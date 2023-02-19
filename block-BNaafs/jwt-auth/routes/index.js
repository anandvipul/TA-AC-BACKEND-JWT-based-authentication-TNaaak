var express = require('express');
var router = express.Router();
let auth = require("../middlewares/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/premium", auth.verifyToken,(req, res, next) => {
  
  res.json({access: "Protected Resource"});
});

module.exports = router;
